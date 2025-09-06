import { View } from "react-native";
import { ComponentProps } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { RectButton } from "react-native-gesture-handler";
import Icon from "./Icon";
import { useTheme } from "@react-navigation/native";

interface IconButtonProps {
    name: ComponentProps<typeof Icon>["name"];
    size?: number;
    color?: string;
    onPress?: () => void;
    disabled?: boolean;
}

export function IconButton({
    name,
    size = 24,
    color,
    ...props
}: IconButtonProps) {
    const { colors } = useTheme();
    return (
        <RectButton onPress={props.onPress} enabled={!props.disabled}>
            <View
                className={clsx(
                    "items-center justify-center p-2",
                    props.disabled && "opacity-50",
                )}
            >
                <Icon
                    name={name}
                    size={size}
                    color={color || colors.text}
                    {...props}
                />
            </View>
        </RectButton>
    );
}
