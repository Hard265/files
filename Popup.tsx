import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Text } from "./components";
interface Item {
    title: string;
    onPress: () => void;
}

interface PopupProps {
    title?: string;
    canGoBack?: boolean;
    canGoForward?: boolean;
    items?: Item[];
}

export default function Popup({
    children,
    items,
    title,
}: PropsWithChildren<PopupProps>) {
    return (
        <Menu>
            <MenuTrigger>{children}</MenuTrigger>
            <MenuOptions>
                {title && (
                    <View className="p-4">
                        <Text variant="title3">{title}</Text>
                    </View>
                )}
                {items
                    && items.map((item, index) => (
                        <MenuOption
                            key={index}
                            onSelect={item.onPress}
                        >
                            <Text>{item.title}</Text>
                        </MenuOption>
                    ))}
            </MenuOptions>
        </Menu>
    );
}
