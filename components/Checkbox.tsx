import { useTheme } from "@react-navigation/native";
import { Pressable, View } from "react-native";
// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import Icon from "./Icon";

interface CheckboxProps {
    checked?: boolean;
    onChange?(value: boolean): void;
    disabled?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
    const theme = useTheme();
    return (
        <Pressable
            onPress={() => props.onChange?.(!props.checked)}
            className="p-2"
            disabled={props.disabled}
        >
            <View
                className={clsx([
                    "size-5 items-center justify-center rounded border",
                    "border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800",
                    props.checked
                        && "border-transparent bg-primary dark:border-transparent dark:!bg-neutral-600 dark:bg-neutral-800",
                    props.disabled && "opacity-50",
                ])}
            >
                {props.checked && (
                    <Icon
                        name="check_fill"
                        size={16}
                        color={
                            !theme.dark ?
                                theme.colors.background
                            :   theme.colors.text
                        }
                    />
                )}
            </View>
        </Pressable>
    );
}
