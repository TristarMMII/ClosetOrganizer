import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
    viewType: "grid" | "list";
    onChange: (value: "grid" | "list") => void;
};

export default function ViewToggle({ viewType, onChange }: Props) {
    return (
        <View style={styles.container}>
            {/* Grid Button */}
            <TouchableOpacity
                style={[styles.button, viewType === "grid" && styles.activeButton]}
                onPress={() => onChange("grid")}
            >
                <Text
                    style={[
                        styles.text,
                        viewType === "grid" && styles.activeText
                    ]}
                >
                    Grid
                </Text>
            </TouchableOpacity>

            {/* List Button */}
            <TouchableOpacity
                style={[styles.button, viewType === "list" && styles.activeButton]}
                onPress={() => onChange("list")}
            >
                <Text
                    style={[
                        styles.text,
                        viewType === "list" && styles.activeText
                    ]}
                >
                    List
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F0F1F4",
        borderRadius: 10,
        marginLeft: 10,
    },
    button: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        margin: 4,
        borderRadius: 6,
    },
    activeButton: {
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 14,
        color: "#666",
    },
    activeText: {
        color: "#111",
        fontWeight: "600",
    },
});
