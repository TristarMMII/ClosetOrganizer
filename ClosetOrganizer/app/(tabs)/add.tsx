import { View, Text, StyleSheet } from "react-native";

export default function AddScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Item</Text>
            <Text>Simple UI here for adding items.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
});
