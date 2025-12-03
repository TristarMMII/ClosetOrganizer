import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../components/sidebar";

export default function Statistics() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Statistics</Text>
                <Text>Your closet analytics will go here.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold" },
});
