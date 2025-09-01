import { PropsWithChildren } from "react";
import { Text } from "./Text";
import { RootStackParamsList } from "@/Router";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface LinkProps {
    to: keyof RootStackParamsList;
    params?: RootStackParamsList[keyof RootStackParamsList];
    behavior?: "push" | "replace" | "navigate";
}
export default function Link({
    to,
    behavior = "push",
    ...props
}: PropsWithChildren<LinkProps>) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();

    const pressHandler = () => {
        navigation[behavior](to as any, props.params);
    };

    return (
        <Pressable onPress={pressHandler}>
            <Text {...props} />
        </Pressable>
    );
}
