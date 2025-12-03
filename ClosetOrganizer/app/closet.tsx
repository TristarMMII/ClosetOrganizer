import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../components/sidebar";

export default function Closet() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>My Closet</Text>
                <Text>This is where your items will appear.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold" },
});
