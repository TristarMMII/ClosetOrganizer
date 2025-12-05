import { View, Text, Image, StyleSheet } from "react-native";

type ClothingItem = {
    name: string;
    worn: number;
    cpw: string;
    image: string;
};

type Props = {
    item: ClothingItem;
    viewType: "grid" | "list";
};

export default function ClothingCard({ item, viewType }: Props) {
    const listMode = viewType === "list";

    // LIST MODE stays the same; only GRID MODE changes to 4 columns
    if (listMode) {
        return (
            <View style={styles.listCard}>
                <Image source={{ uri: item.image }} style={styles.listImage} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.detail}>Worn: {item.worn} times</Text>
                    <Text style={styles.detail}>CPW: {item.cpw}</Text>
                </View>
            </View>
        );
    }

    // GRID MODE - 4 PER ROW
    return (
        <View style={styles.gridCard}>
            <Image source={{ uri: item.image }} style={styles.gridImage} />

            <Text style={styles.gridName} numberOfLines={1}>
                {item.name}
            </Text>

            <div style={styles.horizontalText}>
                <Text style={styles.gridMeta}>Worn: {item.worn} times</Text>
                <Text style={styles.gridMeta}>CPW: {item.cpw}</Text>
            </div>
        </View>
    );
}

const styles = StyleSheet.create({
    // GRID MODE (4 per row)
    gridCard: {
        width: 280,
        marginRight: 20,
        marginBottom: 20,
    },
    gridImage: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
        marginBottom: 8,
    },

    gridName: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 2,
    },
    gridMeta: {
        fontSize: 15,
        color: "#666",
        marginRight: 20
    },
    horizontalText: {
        flex: 1,
    },

    // LIST MODE
    listCard: {
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eee",
    },

    listImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        justifyContent: "center",
    },
    name: { fontWeight: "600", fontSize: 20, marginBottom: 4 },
    detail: { fontSize: 15, color: "#666" },
});
