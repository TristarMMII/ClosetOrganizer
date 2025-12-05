import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    value: string;
    onChange: (text: string) => void;
};

export default function ClosetSearchBar({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={18}
                color="#999"
                style={{ marginRight: 8 }}
            />
            <TextInput
                placeholder="Search for an item..."
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    input: {
        flex: 1,
        fontSize: 14,
    },
});
