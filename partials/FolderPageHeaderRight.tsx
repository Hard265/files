import Icon from "@/components/Icon";
import { RootStackParamsList } from "@/Router";
import store from "@/stores";
import {useApolloClient} from "@apollo/client/react";
import {
    RouteProp,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import _ from "lodash";
import React, { ComponentProps } from "react";
import { Pressable, View } from "react-native";

function FolderPageHeaderRight({
    tintColor,
}: {
    tintColor?: string;
}) {
    const client = useApolloClient();
    const { colors } = useTheme();
    const route = useRoute<RouteProp<RootStackParamsList>>();

    const items: {
        name: string;
        icon: ComponentProps<typeof Icon>["name"];
    }[] = _.compact([
        {
            name: "search",
            icon: "search_line",
        },
        {
            name: "add",
            icon: "add_line",
        },
        route.params?.id && {
            name: "share",
            icon: "user_add_2_line",
        },
    ]);

    return (
        <View className="flex-row gap-x-4 -mr-2.5">
            {items.map((item) => (
                <Pressable
                    onPress={() => {
                        store.auth.signout(client);
                    }}
                    key={item.name}
                    className="p-1.5 rounded-full"
                    android_ripple={{
                        borderless: true,
                        radius: 20,
                        color: colors.border,
                    }}
                >
                    <Icon
                        name={item.icon}
                        size={24}
                        color={tintColor}
                    />
                </Pressable>
            ))}
        </View>
    );
}

export default React.memo(FolderPageHeaderRight);
