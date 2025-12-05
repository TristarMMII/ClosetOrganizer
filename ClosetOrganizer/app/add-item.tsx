import { View, Text } from "react-native";
import Sidebar from "../components/sidebar";
import styles from "../styles/general.styles"

export default function AddItem() {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.content}>
                <Text style={styles.title}>Add New Item</Text>
                <Text style={styles.subtitle}>Upload an image and enter item details here.</Text>
            </View>
        </View>
    );
}
