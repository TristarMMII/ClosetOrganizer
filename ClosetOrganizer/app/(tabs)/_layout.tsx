import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="closet" options={{ title: "Closet" }} />
            <Tabs.Screen name="add" options={{ title: "Add" }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        </Tabs>
    );
}
