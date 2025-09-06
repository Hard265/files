import { ComponentProps, PropsWithChildren } from "react";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { Text } from "./Text";
import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import { useTheme } from "@react-navigation/native";

interface Item {
    label: string;
    value: string;
    icon?: ComponentProps<typeof Icon>["name"];
}

interface IPopupProps {
    title?: string;
    items: Item[];
    onChange?: (value: string) => void;
}

export default function Popup(props: PropsWithChildren<IPopupProps>) {
    const { colors } = useTheme();
    return (
        <Menu onSelect={props.onChange}>
            <MenuTrigger>{props.children}</MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: colors.card,
                        borderRadius: 5,
                        borderColor: colors.border,
                        width: "auto",
                        borderWidth: StyleSheet.hairlineWidth,
                    },
                    optionWrapper: {
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        columnGap: 16,
                    },
                }}
            >
                {props.title && (
                    <View className="p-4 py-2.5">
                        <Text>{props.title}</Text>
                    </View>
                )}
                {props.items.map((item, index) => (
                    <MenuOption key={item.value} value={item.value}>
                        {item.icon && (
                            <Icon
                                name={item.icon}
                                size={20}
                                color={colors.text}
                            />
                        )}
                        <Text key={index}>{item.label}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
}
