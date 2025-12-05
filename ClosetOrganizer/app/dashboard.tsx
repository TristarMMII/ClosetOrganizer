import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import Sidebar from "../components/sidebar";
import StatsCard from "../components/StatsCard";
import SectionHeader from "../components/SectionHeader";
import ItemCard from "../components/ItemCard";

// temporary filler data
const goToPieces = [
    {
        name: "Blue Denim Jacket",
        subtext: "Worn 25 times",
        image: "https://i.imgur.com/sJ2wz5E.jpeg",
    },
    {
        name: "Classic White Tee",
        subtext: "Worn 22 times",
        image: "https://i.imgur.com/bR44Cbp.jpeg",
    },
    {
        name: "Black Skinny Jeans",
        subtext: "Worn 18 times",
        image: "https://i.imgur.com/7pCi7R3.jpeg",
    },
    {
        name: "Leather Ankle Boots",
        subtext: "Worn 15 times",
        image: "https://i.imgur.com/J2Nc2r7.jpeg",
    },
];

// temporary filler data
const lowestCost = [
    {
        name: "Striped Longsleeve",
        subtext: "$1.20 per wear",
        image: "https://i.imgur.com/yuYhcZw.jpeg",
    },
    {
        name: "Beige Trench Coat",
        subtext: "$1.75 per wear",
        image: "https://i.imgur.com/EVL0g33.jpeg",
    },
    {
        name: "Leather Crossbody",
        subtext: "$2.10 per wear",
        image: "https://i.imgur.com/YpJx6jw.jpeg",
    },
    {
        name: "White Sneakers",
        subtext: "$2.50 per wear",
        image: "https://i.imgur.com/mA5eKLi.jpeg",
    },
];

export default function Dashboard() {
    return (
        <View style={styles.container}>
            {/* sidebar for navigation */}
            <Sidebar />

            <ScrollView style={styles.content}>
                {/* TODO: change name to logged in user */}
                <Text style={styles.title}>Welcome, Jane!</Text>
                <Text style={styles.subtitle}>Here is your closet at a glance.</Text>

                {/* Stats */}
                {/* TODO: change later */}
                <View style={styles.statsRow}>
                    <StatsCard label="Total Items" value="152" />
                    <StatsCard label="Closet Value" value="$8,450" />
                    <StatsCard label="Avg. Cost Per Wear" value="$3.15" />
                </View>

                <SectionHeader title="Your Go-To Pieces" />

                <FlatList
                    horizontal
                    data={goToPieces}
                    renderItem={({ item }) => <ItemCard item={item} />}
                    keyExtractor={(_, i) => i.toString()}
                    showsHorizontalScrollIndicator={false}
                />


                <SectionHeader title="Lowest Cost Per Wear" />

                <FlatList
                    horizontal
                    data={lowestCost}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <ItemCard item={item} />}
                    keyExtractor={(_, i) => i.toString()}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", flex: 1, backgroundColor: "#fff" },
    content: { paddingHorizontal: 20, paddingTop: 60, flex: 1 },
    title: { fontSize: 40, fontWeight: "700" },
    subtitle: { color: "#666", marginBottom: 20, fontSize: 22 },
    statsRow: {
        flexDirection: "row",
        marginBottom: 25,
    },
});
