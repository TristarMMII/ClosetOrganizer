import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ClosetScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Closet</Text>
            <Text>Your items will show here.</Text>

            <Button
                title="View Example Item"
                onPress={() => router.push("/item/123")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
});
