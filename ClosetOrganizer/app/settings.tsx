import { View, Text } from "react-native";
import Sidebar from "../components/sidebar";
import styles from "../styles/general.styles"

export default function Settings() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Adjust your preferences here.</Text>
            </View>
        </View>
    );
}