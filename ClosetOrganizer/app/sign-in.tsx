import { Platform, View, StyleSheet, Text } from "react-native";
import { SignIn as ExpoSignIn } from "@clerk/clerk-expo";
import { SignIn as ReactSignIn } from "@clerk/clerk-react";

export default function SignInScreen() {
    const SignInComponent: any = Platform.OS === "web" ? ReactSignIn : ExpoSignIn;

    if (!SignInComponent) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "#666" }}>Sign In component is not available on this platform.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SignInComponent afterSignInUrl="/" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
});
