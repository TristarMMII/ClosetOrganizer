import { Platform, View, StyleSheet, Text } from "react-native";
import { SignUp as ExpoSignUp } from "@clerk/clerk-expo";
import { SignUp as ReactSignUp } from "@clerk/clerk-react";

export default function SignUpScreen() {
    const SignUpComponent: any = Platform.OS === "web" ? ReactSignUp : ExpoSignUp;

    if (!SignUpComponent) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "#666" }}>Sign Up component is not available on this platform.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SignUpComponent afterSignUpUrl="/" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
});
