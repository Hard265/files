import { View } from "react-native";
import { Text } from "./Text";

export default function FatalError() {
    return (
        <View className="items-center justify-center flex-1">
            <Text variant="largeTitle">Something went wrong</Text>
        </View>
    );
}
