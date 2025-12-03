import { View, Text, StyleSheet } from "react-native";

type StatsCardProps = {
    label: string;
    value: string;
};

export default function StatsCard({ label, value }: StatsCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: "#E8E8E8",
    },
    label: { color: "#777", marginBottom: 8 },
    value: { fontSize: 20, fontWeight: "700" },
});
