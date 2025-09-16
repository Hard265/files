import { Pressable, TextInputProps, View } from "react-native";
import Checkbox from "./Checkbox";
import { ReactNode, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Text } from "./ui/text";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface ListItemProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    prepend?: ReactNode;
    hasCheckbox?: boolean;
    checked?: boolean;
    editing?: boolean;
    blurEditing?(): void;
    submitEditing?(value: string): void;
    onCheckedChange?(): void;
    isCompact?: boolean;
    onPress?(): void;
    onLongPress?(): void;
}

export default function ListItem({
    title,
    subtitle,
    hasCheckbox,
    icon,
    prepend,
    isCompact,
    checked,
    editing,
    blurEditing,
    submitEditing,
    onCheckedChange,
    onLongPress,
    onPress,
}: ListItemProps) {
    const { colors } = useTheme();

    const submit = (value: string) => {
        if (value === title) return;
        submitEditing?.(title);
    };

    return (
        <Pressable
            className={cn(
                "flex-row pl-3 items-center gap-x-3",
                isCompact ? "h-12" : "h-16",
            )}
            onLongPress={onLongPress}
            onPress={onPress}
        >
            {hasCheckbox && (
                <Pressable
                    onPress={onCheckedChange}
                    className="items-center -mx-2 justify-center h-full px-2"
                >
                    <Checkbox checked={checked} />
                </Pressable>
            )}
            {
                <View className="flex-1 h-full pr-3 flex-row items-center gap-x-3  border-b border-neutral-200 dark:border-neutral-800">
                    {icon}
                    {editing ?
                        <TextInput
                            initialValue={title}
                            onBlur={blurEditing}
                            onSubmitEditing={({ nativeEvent: { text } }) =>
                                submit(text)
                            }
                            className="flex-1 w-auto"
                            autoFocus
                        />
                    :   <View className="h-full justify-center flex-1">
                            <Text numberOfLines={1} ellipsizeMode="tail">
                                {title}
                            </Text>
                        </View>
                    }
                </View>
            }
        </Pressable>
    );
}

function TextInput({
    initialValue,
    ...props
}: { initialValue: string } & TextInputProps) {
    const [value, setValue] = useState(initialValue);

    return <Input {...props} value={value} onChangeText={setValue} />;
}
