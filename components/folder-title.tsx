import { PropsWithChildren } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export function FolderTitle({
    children,
    tintColor,
}: PropsWithChildren<{ tintColor?: string }>) {
    return (
        <View>
            <Animated.Text
                style={{ color: tintColor }}
                className="text-xl font-semibold"
            >
                {children}
            </Animated.Text>
        </View>
    );
}
