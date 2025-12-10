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

        // Date validation
        const dateError = validateTypedDate(purchaseDateInput);
        if (dateError) newErrors.purchaseDate = dateError;

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

    function formatDate(date?: Date) {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }

    function parseTypedDate(text: string) {
        // expects mm/dd/yyyy format
        const parts = text.split("/");
        if (parts.length !== 3) return undefined;

        const [month, day, year] = parts.map(Number);
        if (!month || !day || !year) return undefined;

        const newDate = new Date(year, month - 1, day);
        return isNaN(newDate.getTime()) ? undefined : newDate;
    }

    function validateTypedDate(input: string): string | null {
        if (!input.trim()) return null; // optional field

        // Must match MM/DD/YYYY format
        const pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}$/;
        if (!pattern.test(input)) {
            return "Please enter a valid date in MM/DD/YYYY format.";
        }

        const parsed = parseTypedDate(input);
        if (!parsed || isNaN(parsed.getTime())) {
            return "Invalid date.";
        }

        const now = new Date();
        const year = parsed.getFullYear();

        if (year < 1900) {
            return "Year must be 1900 or later.";
        }

        if (year > now.getFullYear()) {
            return "Year cannot be in the future.";
        }

        // 🚫 Reject actual future dates (month/day)
        if (parsed > now) {
            return "Purchase date cannot be in the future.";
        }

        // EXTRA VALIDATION: catch invalid days (e.g., 02/31)
        const [month, day, yr] = input.split("/").map(Number);
        const constructed = new Date(yr, month - 1, day);
        if (
            constructed.getMonth() + 1 !== month ||
            constructed.getDate() !== day ||
            constructed.getFullYear() !== yr
        ) {
            return "Please enter a valid calendar date.";
        }

        return null; // date is valid
    }


    function WebDatePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
        return (
            <input
                type="date"
                value={value ? value.split("/").reverse().join("-") : ""}
                onChange={(e) => {
                    const iso = e.target.value; // yyyy-mm-dd
                    if (!iso) return onChange("");

                    const [year, month, day] = iso.split("-");
                    onChange(`${month}/${day}/${year}`);
                }}
                style={{
                    height: 46,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: "#CBD5E0",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    cursor: "pointer",
                }}
            />
        );
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
        return (
            <input
                type="date"
                value={value ? value.split("/").reverse().join("-") : ""}
                onChange={(e) => {
                    const iso = e.target.value; // yyyy-mm-dd
                    if (!iso) return onChange("");

                    const [year, month, day] = iso.split("-");
                    onChange(`${month}/${day}/${year}`);
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
                    appearance: "none",
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
                <Text style={styles.label}>Purchase Date</Text>

                <View style={styles.dateRow}>
                    {Platform.OS === "web" ? (
                        <WebDatePickerInput
                            value={purchaseDateInput}
                            onChange={(text) => {
                                setPurchaseDateInput(text);
                                const parsed = parseTypedDate(text);
                                if (parsed) setDate(parsed);
                            }}
                            error={!!errors.purchaseDate}
                        />
                    ) : (
                        <TextInput
                            style={[
                                styles.input,
                                errors.purchaseDate && styles.inputError,
                                { flex: 1 }
                            ]}
                            placeholder="mm/dd/yyyy"
                            value={purchaseDateInput}
                            onChangeText={(text) => {
                                setPurchaseDateInput(text);
                                const parsed = parseTypedDate(text);
                                if (parsed) setDate(parsed);
                            }}
                        />
                    )}

                    {/* ICON (mobile only) */}
                    {Platform.OS !== "web" && (
                        <TouchableOpacity
                            style={styles.dateIconButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={20} color="#555" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Error Below Field */}
                {errors.purchaseDate && (
                    <Text style={styles.error}>{errors.purchaseDate}</Text>
                )}

                {/* Native iOS/Android Picker */}
                {showDatePicker && Platform.OS !== "web" && (
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDate(selectedDate);
                                setPurchaseDateInput(formatDate(selectedDate));
                            }
                        }}
                    />
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





