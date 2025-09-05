import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    View,
} from "react-native";
import { Text } from "./Text";
import { ComponentProps, PropsWithChildren } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import colors from "tailwindcss/colors";
import { RectButton } from "react-native-gesture-handler";
import Icon from "./Icon";
import { useTheme } from "@react-navigation/native";

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
}

export function Button({
    children,
    className,
    loading,
    disabled,
    ...props
}: PropsWithChildren<ButtonProps & PressableProps>) {
    return (
        <Pressable
            {...props}
            disabled={disabled}
            className={clsx(
                "border bg-zinc-900 border-zinc-950/90 dark:bg-zinc-600",
                className,
                "relative items-center flex justify-center gap-x-2 rounded-lg border",
                "h-12",
                disabled && "opacity-50",
            )}
        >
            {loading ?
                <ActivityIndicator color={colors.white} />
            :   <Text className="font-semibold text-zinc-950 dark:text-white sm:text-sm/6 text-base/6">
                    {children}
                </Text>
            }
        </Pressable>
    );
}

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
