import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ItemDetail() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Detail</Text>
            <Text>Item ID: {id}</Text>
            <Text>This is where item details will go.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
});
