import { Theme } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

export default function LoadingPage({ theme }: { theme: Theme }) {
    return (
        <View className="items-center justify-center flex-1">
            <ActivityIndicator
                size="large"
                color={theme.colors.text}
            />
        </View>
    );
}
