import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddItemScreen() {
    const router = useRouter();

    return (

        <ScrollView
            style={styles.container}
        >
            <Text style={styles.title}>Add New Clothing Item</Text>
            <Text style={styles.subtitle}>
                Fill in the details below to add a new item to your digital closet.
            </Text>

            {/* Upload Box */}
            <View style={styles.uploadBox}>
                <Ionicons name="cloud-upload-outline" size={50} color="#A0AEC0" />
                <Text style={styles.uploadTitle}>Upload Photo</Text>
                <Text style={styles.uploadSubtitle}>
                    Drag and drop an image of your clothing item here, or click to browse.
                </Text>

                <TouchableOpacity style={styles.browseButton}>
                    <Text style={styles.browseButtonText}>Browse Files</Text>
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Blue Denim Jacket"
                    placeholderTextColor="#A0AEC0"
                />

                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Brand</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Levi's"
                            placeholderTextColor="#A0AEC0"
                        />
                    </View>

                    <View style={{ width: 160 }}>
                        <Text style={styles.label}>Purchase Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="mm/dd/yyyy"
                            placeholderTextColor="#A0AEC0"
                        />
                    </View>
                </View>

                <Text style={styles.label}>Cost</Text>
                <TextInput
                    style={styles.input}
                    placeholder="$ 79.99"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="e.g., Goes well with white sneakers. Bought on sale."
                    placeholderTextColor="#A0AEC0"
                    multiline
                />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.push("/closet")}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        paddingTop: 32,
        paddingBottom: 48,
        paddingHorizontal: 32,
    },

    title: {
        fontSize: 36,          // was 32
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 18,          // was 15
        color: "#666",
        marginBottom: 22,
    },

    uploadBox: {
        borderWidth: 2,
        borderColor: "#CBD5E0",
        borderStyle: "dashed",
        borderRadius: 12,
        height: 190,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 28,
        backgroundColor: "#FAFAFA",
    },

    uploadTitle: {
        fontSize: 20,          // was 17
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 4,
    },

    uploadSubtitle: {
        color: "#777",
        fontSize: 15,          // was 13
        textAlign: "center",
        marginBottom: 12,
    },

    browseButton: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 8,
    },

    browseButtonText: {
        color: "#4A5568",
        fontWeight: "600",
        fontSize: 15,          // was 13
    },

    form: {
        width: "100%",
        marginTop: 8,
    },

    label: {
        fontSize: 15,          // was 13
        fontWeight: "600",
        marginBottom: 6,
    },

    input: {
        backgroundColor: "#fff",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,           // slightly increased padding for bigger text
        marginBottom: 16,
        fontSize: 15,          // was 13
    },

    notesInput: {
        height: 100,
        textAlignVertical: "top",
    },

    row: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        gap: 12,
    },

    cancelButton: {
        borderWidth: 1,
        borderColor: "#CBD5E0",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },

    cancelText: {
        color: "#555",
        fontWeight: "600",
        fontSize: 15,          // was 13
    },

    addButton: {
        backgroundColor: "#4B7BFF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,          // was 14
    },
});


