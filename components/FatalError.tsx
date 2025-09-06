import { View } from "react-native";
import { Text } from "./Text";

export default function FatalError(props: any) {
    console.log(props);
    return (
        <View className="items-center justify-center flex-1">
            <Text variant="largeTitle" className="text-center">
                Something went wrong :-(
            </Text>
        </View>
    );
}
