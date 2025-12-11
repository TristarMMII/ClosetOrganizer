import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../styles/add.styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/clerk-expo";



const clothingTypes = [
    "Top",
    "Bottom",
    "Shoes",
    "Outerwear",
    "Accessories",
    "Other",
];

export default function AddItemScreen() {
    const router = useRouter();
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    // Form state
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    // const [purchaseDateInput, setPurchaseDateInput] = useState("");
    const [cost, setCost] = useState("");
    const [notes, setNotes] = useState("");
    const [type, setType] = useState("");
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [imageUri, setImageUri] = useState<string | null>(null);
    const webFilePickerRef = useRef<HTMLInputElement>(null);



    // Errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Auto-format cost while typing
    function handleCostChange(text: string) {
        // Remove all characters except digits + decimal
        let cleaned = text.replace(/[^0-9.]/g, "");

        // Prevent multiple decimals
        const parts = cleaned.split(".");
        if (parts.length > 2) {
            cleaned = parts[0] + "." + parts[1];
        }

        setCost(cleaned);
    }

    // Format cost to currency when user leaves input
    function finalizeCost() {
        if (!cost) return;

        const num = Number(cost);
        if (!isNaN(num)) {
            setCost(num.toFixed(2)); // Example → "12.50"
        }
    }


    function validate() {
        const newErrors: any = {};

        // Name required
        if (!name.trim()) newErrors.name = "Item name is required.";

        // Cost validation
        if (cost) {
            const isNumeric = /^[0-9]*\.?[0-9]+$/.test(cost);
            if (!isNumeric) {
                newErrors.cost = "Price must be a valid number.";
            } else if (Number(cost) < 0) {
                newErrors.cost = "Price cannot be negative.";
            }
        }

        if (!date) {
            newErrors.purchaseDate = "Please select a purchase date.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    async function handleSubmit() {
        if (!isSignedIn) {
            // Redirect to sign in
            router.push({ pathname: '/sign-in' } as any);
            return;
        }
        if (!validate()) return;

        // 1. Upload image first
        const imageUrl = await uploadImage();

        // 2. Format cost
        const formattedCost = cost
            ? Number(cost).toFixed(2)
            : null;

        // 3. Save to Supabase table
        console.log('Saving item for Clerk ID:', user?.id);
        let res = await supabase.from("closet_items").insert({
            name,
            brand,
            clothing_type: type,
            notes,
            cost: formattedCost,
            purchase_date: date?.toISOString(),
            image_url: imageUrl,   // <<<<<< SAVED CORRECTLY
            clerk_user_id: user?.id,
        });

        let error = res.error;

        // If the clerk_user_id column doesn't exist, fall back to user_id (legacy)
        const colNotFound = (error?.message || '').toLowerCase().includes('column "clerk_user_id"') ||
            (error?.code === '42703'); // undefined column

        if (colNotFound) {
            console.warn('clerk_user_id column not found — falling back to user_id insertion.');
            Alert.alert(
                'Database column not found',
                'The `clerk_user_id` column is not present in your `closet_items` table.\n\nYou can add it with:\n\nalter table public.closet_items add column clerk_user_id text;\ncreate index on public.closet_items (clerk_user_id);\n\nOr if you want to keep `user_id`, ensure it is a text column that can store Clerk user IDs.'
            );
            const res2 = await supabase.from("closet_items").insert({
                name,
                brand,
                clothing_type: type,
                notes,
                cost: formattedCost,
                purchase_date: date?.toISOString(),
                image_url: imageUrl,
                user_id: user?.id,
            });
            error = res2.error;
        }

        if (error) {
            console.log("Supabase insert error:", error);

            // If the database indicates a UUID parsing error, show a more helpful alert
            const message = error?.message || "Unknown error";
            if (message.includes("invalid input syntax for type uuid") || error.code === "22P02") {
                Alert.alert(
                    "Database type mismatch",
                    "Your database expects a UUID for the `user_id` column, but Clerk user IDs are not UUIDs (they look like `user_xxx`).\n\nTo fix this, change the `user_id` column to text: see README-CLERK-SUPABASE.md for steps."
                );
            } else {
                Alert.alert("Error saving item", message);
            }

            return;
        }

        router.push("/closet");
    }



    function formatDate(date: Date | null) {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }


    // For the web date input we use a standard <input type="date"> inline above. Removed the custom WebDatePickerInput to avoid unused definition.


    async function pickImage() {
        if (Platform.OS === "web") {
            // Open hidden <input type="file">
            webFilePickerRef.current?.click();
            return;
        }

        // Native (iOS/Android)
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission denied! Please allow photo permissions.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    function handleWebFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImageUri(url);
    }

    async function uploadImage(): Promise<string | null> {
        if (!imageUri) return null;

        try {
            let file: any;
            let filePath = `items/${Date.now()}-${Math.random()}.jpg`;

            if (Platform.OS === "web") {
                // On web, convert input file to File object
                const input = webFilePickerRef.current;
                if (!input || !input.files?.[0]) return null;

                file = input.files[0];

            } else {
                // Native — convert file:// URI to blob
                const response = await fetch(imageUri);
                file = await response.blob();
            }

            // Upload to Supabase Storage
            const { error } = await supabase.storage
                .from("closet-images")
                .upload(filePath, file, {
                    contentType: "image/jpeg",
                    upsert: false,
                });

            if (error) {
                console.error("Upload error:", error);
                return null;
            }

            // Get a public URL
            const { data: publicUrlData } = supabase.storage
                .from("closet-images")
                .getPublicUrl(filePath);

            return publicUrlData.publicUrl;

        } catch (e) {
            console.error("uploadImage() error:", e);
            return null;
        }
    }



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Clothing Item</Text>
            <Text style={styles.subtitle}>
                Fill in the details below to add a new item to your digital closet.
            </Text>

            {/* Upload Box */}
            {Platform.OS === "web" && (
                <input
                    ref={webFilePickerRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleWebFileChange}
                />
            )}

            <View style={styles.uploadBox}>
                {imageUri ? (
                    <>
                        <Image
                            source={{ uri: imageUri }}
                            style={{ width: 160, height: 160, borderRadius: 12, marginBottom: 12 }}
                            resizeMode="cover"
                        />
                        <TouchableOpacity style={styles.browseButton} onPress={pickImage}>
                            <Text style={styles.browseButtonText}>
                                {imageUri ? "Change Image" : "Browse Files"}
                            </Text>
                        </TouchableOpacity>

                    </>
                ) : (
                    <>
                        <Ionicons name="cloud-upload-outline" size={50} color="#A0AEC0" />
                        <Text style={styles.uploadTitle}>Upload Photo</Text>
                        <Text style={styles.uploadSubtitle}>
                            Drag & drop an image or click to browse.
                        </Text>

                        <TouchableOpacity style={styles.browseButton} onPress={pickImage}>
                            <Text style={styles.browseButtonText}>Browse Files</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>


            {/* FORM */}
            <View style={styles.form}>
                {/* Item Name */}
                <Text style={styles.label}>Item Name *</Text>
                <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="e.g., Blue Denim Jacket"
                    value={name}
                    onChangeText={setName}
                />

                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                {/* Clothing Type and Dropdown Menu */}
                <Text style={styles.label}>Clothing Type</Text>

                <View style={styles.dropdownWrapper}>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setIsTypeOpen((prev) => !prev)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.dropdownText}>
                            {type || "Select clothing type"}
                        </Text>
                        <Ionicons name={isTypeOpen ? "chevron-up" : "chevron-down"} size={18} color="#555" />
                    </TouchableOpacity>

                    {isTypeOpen && (
                        <View style={styles.dropdownMenu}>
                            {clothingTypes.map((t) => (
                                <TouchableOpacity
                                    key={t}
                                    onPress={() => {
                                        setType(t);
                                        setIsTypeOpen(false);
                                    }}
                                    style={styles.dropdownItemWrapper}
                                >
                                    <Text style={styles.dropdownItem}>{t}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>


                {/* Brand + Date */}
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Brand (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Levi's"
                            value={brand}
                            onChangeText={setBrand}
                        />
                    </View>


                </View>

                {/* Purchase Date */}
                {/* Purchase Date */}
                <Text style={styles.label}>Purchase Date</Text>

                {Platform.OS === "web" ? (
                    // --- WEB DATE INPUT ---
                    <input
                        type="date"
                        value={date ? date.toISOString().split("T")[0] : ""}
                        onChange={(e) => {
                            const iso = e.target.value;
                            if (!iso) return;
                            const selected = new Date(iso);
                            setDate(selected);
                        }}
                        style={{

                            height: 48,
                            padding: "0 12px",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: errors.purchaseDate ? "#E53E3E" : "#E2E8F0",
                            borderRadius: 8,
                            fontSize: 16,
                            backgroundColor: "white",
                        }}
                    />
                ) : (
                    <>

                        <TouchableOpacity
                            style={[
                                styles.input,
                                styles.dateContainer,
                                errors.purchaseDate && styles.inputError
                            ]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: date ? "#000" : "#A0AEC0" }}>
                                {date ? formatDate(date) : "Select a date"}
                            </Text>

                            <Ionicons name="calendar-outline" size={20} color="#555" />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date || new Date()}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(event, selectedDate) => {
                                    if (event.type === "dismissed") {
                                        setShowDatePicker(false);
                                        return;
                                    }

                                    if (selectedDate) {
                                        setDate(selectedDate);
                                        setShowDatePicker(false);
                                    }
                                }}
                            />
                        )}
                    </>
                )}

                {errors.purchaseDate && (
                    <Text style={styles.error}>{errors.purchaseDate}</Text>
                )}


                {/* Cost */}
                <Text style={styles.label}>Cost</Text>
                <TextInput
                    style={[styles.input, errors.cost && styles.inputError]}
                    placeholder="$ 0.00"
                    keyboardType="decimal-pad"
                    value={cost}
                    onChangeText={handleCostChange}
                    onBlur={finalizeCost}
                />
                {errors.cost && <Text style={styles.error}>{errors.cost}</Text>}

                {/* Notes */}
                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Additional notes..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.push("/closet")}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}





