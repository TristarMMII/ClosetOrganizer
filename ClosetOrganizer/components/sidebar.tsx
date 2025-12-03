import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Sidebar() {
    const router = useRouter();

    const menuItems = [
        { label: "Dashboard", route: "/dashboard" },
        { label: "My Closet", route: "/closet" },
        { label: "Statistics", route: "/statistics" },
        { label: "Settings", route: "/settings" },
    ] as const;

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=5" }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Jane Doe</Text>
                <Text style={styles.email}>jane.doe@email.com</Text>
            </View>

            <View style={styles.menu}>
                {menuItems.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.menuItem}
                        onPress={() => router.push({ pathname: item.route })}
                    >
                        <Text style={styles.menuText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push({ pathname: "/add-item" })}
            >
                <Text style={styles.addButtonText}>Add New Item</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 230,
        backgroundColor: "#F5F7FB",
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    profileContainer: { alignItems: "center", marginBottom: 30 },
    avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
    name: { fontSize: 16, fontWeight: "600" },
    email: { fontSize: 12, color: "#666" },
    menu: { marginTop: 15 },
    menuItem: { paddingVertical: 12 },
    menuText: { fontSize: 14, color: "#333" },
    addButton: {
        marginTop: "auto",
        backgroundColor: "#4B7BFF",
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 30,
    },
    addButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },
});
