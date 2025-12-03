import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../components/sidebar";

export default function AddItem() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Add New Item</Text>
                <Text>Upload an image and enter item details here.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold" },
});
