import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

export default function Sidebar() {
    // const router = useRouter();



    return (

        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Jane Doe</Text>
                <Text style={styles.email}>jane.doe@email.com</Text>
            </View>

            <View style={styles.menu}>
                {["Dashboard", "My Closet", "Statistics", "Settings"].map((item, i) => (
                    <TouchableOpacity key={i} style={styles.menuBtn}>
                        <Text style={styles.menuText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Item</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 220,
        backgroundColor: "#F7F9FC",
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    profile: { alignItems: "center", marginBottom: 30 },
    avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
    name: { fontSize: 16, fontWeight: "600" },
    email: { fontSize: 12, color: "#666" },
    menu: { marginTop: 20 },
    menuBtn: {
        paddingVertical: 12,
        paddingLeft: 10,
        borderRadius: 6,
    },
    menuText: { fontSize: 14, color: "#333" },
    addButton: {
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: "#4B7BFF",
        paddingVertical: 12,
        borderRadius: 8,
    },
    addButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "600",
    },
});
