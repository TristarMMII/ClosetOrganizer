import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../styles/add.styles";
import DateTimePicker from "@react-native-community/datetimepicker";



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

    // Form state
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseDateInput, setPurchaseDateInput] = useState("");
    const [cost, setCost] = useState("");
    const [notes, setNotes] = useState("");
    const [type, setType] = useState("");
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);




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


    function handleSubmit() {
        if (!validate()) return;

        const formattedCost = cost
            ? Number(cost).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })
            : null;

        console.log({
            name,
            brand,
            purchaseDate: date ? formatDate(date) : null,
            cost: formattedCost,
            notes,
            type,
        });



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


    function WebDatePickerInput({
        value,
        onChange,
        error,
    }: {
        value: string;
        onChange: (text: string) => void;
        error?: boolean;
    }) {
        // convert MM/DD/YYYY → YYYY-MM-DD safely
        function convertToISO(dateStr: string) {
            if (!dateStr) return "";

            const parts = dateStr.split("/");
            if (parts.length !== 3) return "";

            let [month, day, year] = parts;

            if (year.length !== 4) return ""; // invalid year
            if (!month || !day || !year) return "";

            // zero-pad
            month = month.padStart(2, "0");
            day = day.padStart(2, "0");

            return `${year}-${month}-${day}`;
        }

        // convert YYYY-MM-DD → MM/DD/YYYY
        function convertFromISO(iso: string) {
            if (!iso) return "";
            const [year, month, day] = iso.split("-");
            return `${month}/${day}/${year}`;
        }

        return (
            <input
                type="date"
                value={convertToISO(value)}
                onChange={(e) => {
                    const iso = e.target.value;
                    onChange(convertFromISO(iso));
                }}
                style={{
                    width: "100%",
                    height: 48,
                    padding: "0 12px",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: error ? "#E53E3E" : "#E2E8F0",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    backgroundColor: "white",
                }}
            />
        );
    }





    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Clothing Item</Text>
            <Text style={styles.subtitle}>
                Fill in the details below to add a new item to your digital closet.
            </Text>

            {/* Upload Box */}
            <View style={styles.uploadBox}>
                <Ionicons name="cloud-upload-outline" size={50} color="#A0AEC0" />
                <Text style={styles.uploadTitle}>Upload Photo</Text>
                <Text style={styles.uploadSubtitle}>
                    Drag & drop an image or click to browse.
                </Text>

                <TouchableOpacity style={styles.browseButton}>
                    <Text style={styles.browseButtonText}>Browse Files</Text>
                </TouchableOpacity>
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





