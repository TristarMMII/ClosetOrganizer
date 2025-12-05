import { View, Text } from "react-native";
import Sidebar from "../components/sidebar";
import styles from "../styles/general.styles"

export default function Statistics() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Statistics</Text>
                <Text style={styles.subtitle}>Your closet analytics will go here.</Text>
            </View>
        </View>
    );
}