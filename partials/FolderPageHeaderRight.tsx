import { IconButton } from "@/components";
import Icon from "@/components/Icon";
import { RootStackParamsList } from "@/Router";
import {
    RouteProp,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { ComponentProps } from "react";
import { Pressable, View } from "react-native";
import { ItemsMenu } from "@/components/items-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import {Separator} from "@/components/ui/separator";
import {PlusMenu} from "@/components/plus-menu";

function FolderPageHeaderRight({
    tintColor,
}: {
    tintColor?: string;
}) {
    const { colors } = useTheme();
    const route =
        useRoute<RouteProp<RootStackParamsList, "Folder">>();

    const items: {
        name: string;
        icon: ComponentProps<typeof Icon>["name"];
    }[] = _.compact([
        {
            name: "search",
            icon: "search_line",
        },
        route.params?.id && {
            name: "share",
            icon: "user_add_2_line",
        },
    ]);

    return (
        <View className="flex-row -mr-2 gap-x-2">
            {items.map((item) => (
                <IconButton
                    key={item.name}
                    name={item.icon}
                    size={22}
                    color={tintColor || colors.text}
                />
            ))}
            <PlusMenu />
            {route.params?.id && (
                <ItemsMenu refs={[`Folder:${route.params.id}`]} />
            )}
        </View>
    );
}

export default observer(FolderPageHeaderRight);
