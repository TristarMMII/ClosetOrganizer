import { View, Text, Image, StyleSheet } from "react-native";

type Item = {
    name: string;
    subtext: string;
    image: string;
};

export default function ItemCard({ item }: { item: Item }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subText}>{item.subtext}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { width: 160, marginRight: 16 },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 10,
        marginBottom: 8,
    },
    name: { fontWeight: "600", fontSize: 14 },
    subText: { fontSize: 12, color: "#666" },
});
