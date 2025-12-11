import { View, Text, Image, StyleSheet } from "react-native";

type ClothingItem = {
    id?: string;
    name: string;
    worn?: number;
    cpw?: string;
    image?: string;
    image_url?: string | null;
    cost?: string | null;
};

type Props = {
    item: ClothingItem;
    viewType: "grid" | "list";
};

export default function ClothingCard({ item, viewType }: Props) {
    const listMode = viewType === "list";

    // LIST MODE stays the same; only GRID MODE changes to 4 columns
    const imageUri = item.image || item.image_url || "https://i.pravatar.cc/300";

    if (listMode) {
        return (
            <View style={styles.listCard}>
                <Image source={{ uri: imageUri }} style={styles.listImage} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    {typeof item.worn !== 'undefined' && (
                        <Text style={styles.detail}>Worn: {item.worn} times</Text>
                    )}
                    {item.cost && <Text style={styles.detail}>Cost: ${item.cost}</Text>}
                </View>
            </View>
        );
    }

    // GRID MODE - 4 PER ROW
    return (
        <View style={styles.gridCard}>
            <Image source={{ uri: imageUri }} style={styles.gridImage} />

            <Text style={styles.gridName} numberOfLines={1}>
                {item.name}
            </Text>

            <div style={styles.horizontalText}>
                {typeof item.worn !== 'undefined' && (
                    <Text style={styles.gridMeta}>Worn: {item.worn} times</Text>
                )}
                {item.cost && <Text style={styles.gridMeta}>Cost: ${item.cost}</Text>}
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
