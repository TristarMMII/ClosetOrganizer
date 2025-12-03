import { View, Text, StyleSheet } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 30, marginBottom: 10 },
    title: { fontSize: 18, fontWeight: "700" },
});
