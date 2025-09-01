import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import { Text } from "./Text";
import { PropsWithChildren } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import colors from "tailwindcss/colors";

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
