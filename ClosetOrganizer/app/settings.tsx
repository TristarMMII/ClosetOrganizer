import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../components/sidebar";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>
                <Text>Adjust your preferences here.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", flex: 1 },
    content: { padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold" },
});
