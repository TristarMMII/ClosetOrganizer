import { useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

import Sidebar from "../components/sidebar";
import ClosetSearchBar from "../components/ClosetSearchBar";
import ViewToggle from "../components/ViewToggle";
import ClothingCard from "../components/ClothingCard";
import styles from "../styles/closet.styles";

const initialItems = [
    {
        name: "Blue Denim Jacket",
        worn: 12,
        cpw: "$5.00",
        image: "https://i.imgur.com/sJ2wz5E.jpeg",
    },
    {
        name: "White Sneakers",
        worn: 25,
        cpw: "$3.20",
        image: "https://i.imgur.com/mA5eKLi.jpeg",
    },
    {
        name: "Black T-Shirt",
        worn: 5,
        cpw: "$4.00",
        image: "https://i.imgur.com/bR44Cbp.jpeg",
    },
    {
        name: "Beige Chinos",
        worn: 8,
        cpw: "$6.25",
        image: "https://i.imgur.com/kQO2tJx.jpeg",
    }, {
        name: "Blue Denim Jacket",
        worn: 12,
        cpw: "$5.00",
        image: "https://i.imgur.com/sJ2wz5E.jpeg",
    },
    {
        name: "White Sneakers",
        worn: 25,
        cpw: "$3.20",
        image: "https://i.imgur.com/mA5eKLi.jpeg",
    },
    {
        name: "Black T-Shirt",
        worn: 5,
        cpw: "$4.00",
        image: "https://i.imgur.com/bR44Cbp.jpeg",
    },
    {
        name: "Beige Chinos",
        worn: 8,
        cpw: "$6.25",
        image: "https://i.imgur.com/kQO2tJx.jpeg",
    }, {
        name: "Black T-Shirt",
        worn: 5,
        cpw: "$4.00",
        image: "https://i.imgur.com/bR44Cbp.jpeg",
    },
    {
        name: "Beige Chinos",
        worn: 8,
        cpw: "$6.25",
        image: "https://i.imgur.com/kQO2tJx.jpeg",
    }, {
        name: "Black T-Shirt",
        worn: 5,
        cpw: "$4.00",
        image: "https://i.imgur.com/bR44Cbp.jpeg",
    },
    {
        name: "Beige Chinos",
        worn: 8,
        cpw: "$6.25",
        image: "https://i.imgur.com/kQO2tJx.jpeg",
    },
];

export default function ClosetScreen() {
    const [query, setQuery] = useState("");
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    // Filter items based on search
    const filteredItems = initialItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#F7F8FA" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <ScrollView style={styles.container}>
                <Text style={styles.title}>All Your Items</Text>
                <Text style={styles.subtitle}>
                    A complete overview of your wardrobe.
                </Text>

                {/* Search + Toggle */}
                <View style={styles.topRow}>
                    <ClosetSearchBar value={query} onChange={setQuery} />
                    <ViewToggle viewType={viewType} onChange={setViewType} />
                </View>

                {/* Item Grid / List */}
                {viewType === "grid" ? (
                    <View style={styles.gridWrapper}>
                        {filteredItems.map((item, i) => (
                            <ClothingCard key={i} item={item} viewType={viewType} />
                        ))}
                    </View>
                ) : (
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={({ item }) => (
                            <ClothingCard item={item} viewType={viewType} />
                        )}
                    />
                )}


            </ScrollView>
        </View>
    );
}
