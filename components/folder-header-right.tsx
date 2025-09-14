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
import { View } from "react-native";
import { ItemsMenu } from "@/components/folder-contents-items-menu";
import { PlusMenu } from "@/components/plus-menu";
import { UserMenu } from "./user-menu";

function FolderHeaderRight({ tintColor }: { tintColor?: string }) {
    const { colors } = useTheme();
    const route =
        useRoute<RouteProp<RootStackParamsList, "Folder">>();

    const items: {
        name: string;
        icon: ComponentProps<typeof Icon>["name"];
    }[] = _.compact([
        route.params?.id && {
            name: "share",
            icon: "user_add_2_line",
        },
    ]);

    return (
        <View className="flex-row items-center -mr-2 gap-x-2">
            {items.map((item) => (
                <IconButton
                    key={item.name}
                    name={item.icon}
                    size={22}
                    color={tintColor || colors.text}
                />
            ))}
            <PlusMenu />
            {route.params?.id ?
                <ItemsMenu refs={[`Folder:${route.params.id}`]} />
            :   <UserMenu />}
        </View>
    );
}

export default observer(FolderHeaderRight);
