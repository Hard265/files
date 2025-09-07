import { Pressable, View } from "react-native";
import Checkbox from "./Checkbox";
import { ReactNode } from "react";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { useTheme } from "@react-navigation/native";
import { Text } from "./ui/text";

interface ListItemProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    prepend?: ReactNode;
    hasCheckbox?: boolean;
    checked?: boolean;
    onCheckedChange?(): void;
    isCompact?: boolean;
    onPress?(): void;
}

export default function ListItem({
    title,
    subtitle,
    hasCheckbox,
    icon,
    prepend,
    isCompact,
    checked,
    onCheckedChange,
    onPress,
}: ListItemProps) {
    const { colors } = useTheme();
    return (
        <View
            className={clsx(
                "flex-row flex-1 gap-x-1",
                isCompact ? "h-12" : "h-20",
                hasCheckbox ? "pl-3" : "pl-4",
            )}
        >
            {hasCheckbox && (
                <View
                    className={clsx(
                        !isCompact ? "-mt-0.5 pt-2" : "self-center",
                    )}
                >
                    <Checkbox
                        checked={checked}
                        onChange={onCheckedChange}
                    />
                </View>
            )}
            <Pressable
                onPress={onPress}
                android_ripple={{ color: colors.border }}
                className={clsx(
                    "flex-row rounded-l flex-1 pl-2 pr-4 gap-x-2",
                    isCompact ? "items-center" : "pt-2 items-start",
                )}
            >
                {(prepend || icon) && (
                    <View>
                        {prepend ?
                            prepend
                        : icon ?
                            <View
                                className={clsx(
                                    !isCompact && "mt-0.5",
                                )}
                            >
                                {icon}
                            </View>
                        :   undefined}
                    </View>
                )}
                <View className="flex-col flex-1 gap-y-1">
                    <Text numberOfLines={1} ellipsizeMode="middle">
                        {title}
                    </Text>
                    {subtitle && !isCompact && (
                        <Text variant="small" className="opacity-75">
                            {subtitle}
                        </Text>
                    )}
                </View>
            </Pressable>
        </View>
    );
}
