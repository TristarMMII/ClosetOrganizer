import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

import Sidebar from "../components/sidebar";
import ClosetSearchBar from "../components/ClosetSearchBar";
import ViewToggle from "../components/ViewToggle";
import ClothingCard from "../components/ClothingCard";
import styles from "../styles/closet.styles";
import { supabase } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/clerk-expo";

type Item = {
    id: string;
    name: string;
    image_url?: string | null;
    cost?: string | null;
    clothing_type?: string | null;
};

const initialItems: Item[] = [];

export default function ClosetScreen() {
    const [query, setQuery] = useState("");
    const [viewType, setViewType] = useState<"grid" | "list">("grid");
    const [items, setItems] = useState<Item[]>(initialItems);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        async function load() {
            if (!isSignedIn || !user?.id) {
                setItems([]);
                return;
            }

            setLoading(true);
            // Try reading clerk_user_id first (safer for apps using Clerk). If the column doesn't exist, fallback to user_id.
            let data: any;
            let error: any;
            try {
                const res = await supabase
                    .from("closet_items")
                    .select("id, name, image_url, cost, clothing_type")
                    .eq("clerk_user_id", user.id)
                    .order("created_at", { ascending: false });
                data = res.data; error = res.error;
            } catch (e) {
                // In case of DB-level SQL error (e.g. column doesn't exist), fallback later
                data = null; error = e;
            }

            // If clerk_user_id produced a column-not-found or other SQL error, try the older `user_id` column.
            if (error) {
                console.warn('Error fetching with clerk_user_id, falling back to user_id', error);
                const res2 = await supabase
                    .from("closet_items")
                    .select("id, name, image_url, cost, clothing_type")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });
                data = res2.data; error = res2.error;
            }

            if (error) {
                console.error("Error fetching closet items:", error);
                setItems([]);
            } else {
                setItems(data as Item[]);
            }
            setLoading(false);
        }

        load();
    }, [user?.id, isSignedIn]);

    // Filter items based on search
    const filteredItems = items.filter((item) =>
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
                {!isSignedIn ? (
                    <Text style={{ marginTop: 24, color: '#666' }}>Please sign in to view your closet.</Text>
                ) : loading ? (
                    <Text style={{ marginTop: 24, color: '#666' }}>Loading...</Text>
                ) : viewType === "grid" ? (
                    <View style={styles.gridWrapper}>
                        {filteredItems.map((item, i) => (
                            <ClothingCard key={item.id ?? i} item={item as any} viewType={viewType} />
                        ))}
                    </View>
                ) : (
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ClothingCard item={item as any} viewType={viewType} />
                        )}
                    />
                )}


            </ScrollView>
        </View>
    );
}
