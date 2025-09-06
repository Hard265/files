import { View } from "react-native";
import { Text } from "./ui/text";

export default function FatalError(props: any) {
    console.log(props);
    return (
        <View className="items-center justify-center flex-1">
            <Text variant="h1" className="text-center">
                Something went wrong :-(
            </Text>
        </View>
    );
}
