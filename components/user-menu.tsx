import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import type { TriggerRef } from "@/components/primitives/popover";
import * as React from "react";
import { View } from "react-native";
import Icon from "./Icon";
import store from "@/stores";
import { observer } from "mobx-react-lite";
import { useNavigation, useTheme } from "@react-navigation/native";
import { UserAvatar } from "./user-avatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@/Router";
import { Separator } from "./ui/separator";
import { useApolloClient } from "@apollo/client/react";

export const UserMenu = observer(function UserMenu() {
    const { colors } = useTheme();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const client = useApolloClient();
    const popoverTriggerRef = React.useRef<TriggerRef>(null);

    async function onSignOut() {
        store.auth.signout(client);
        popoverTriggerRef.current?.close();
    }

    return (
        <Popover>
            <PopoverTrigger asChild ref={popoverTriggerRef}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl size-12"
                >
                    <UserAvatar email={store.auth.user?.email} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                side="bottom"
                className="w-auto p-0 max-w-[300px]"
            >
                <View className="p-4 gap-3">
                    <View className="flex-row items-center gap-3">
                        <UserAvatar />
                        <View className="">
                            <Text className="font-medium leading-5">
                                {store.auth.user?.email}
                            </Text>
                            {store.auth.user?.email ?
                                <Text className="text-sm font-normal text-muted-foreground leading-4">
                                    {store.auth.user?.email}
                                </Text>
                            :   null}
                        </View>
                    </View>
                    <Button
                        className="self-end justify-start px-4  bg-green-500 gap-3"
                        variant="default"
                        size="sm"
                    >
                        <Text>Upgrade to Pro</Text>
                    </Button>
                </View>
                <Separator />
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="justify-start px-4 rounded-none gap-3"
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                    >
                        <Text>Settings</Text>
                    </Button>
                </PopoverClose>
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="justify-start px-4 rounded-none gap-3"
                    >
                        <Text>Manage account</Text>
                    </Button>
                </PopoverClose>
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="justify-start px-4 rounded-none gap-3"
                        onPress={onSignOut}
                    >
                        <Text>Log out</Text>
                    </Button>
                </PopoverClose>
                <Separator />
                <Button
                    variant="ghost"
                    className="justify-start px-4 rounded-none gap-3 rounded-b-md"
                >
                    <Icon
                        name="globe_2_line"
                        size={20}
                        color={colors.text}
                    />
                    <Text>English (United States)</Text>
                </Button>
                <Separator />
                <Button
                    variant="ghost"
                    className="justify-start px-4 rounded-none gap-3 rounded-b-md"
                >
                    <Icon
                        name="add_circle_line"
                        size={20}
                        color={colors.text}
                    />
                    <Text>Add account</Text>
                </Button>
            </PopoverContent>
        </Popover>
    );
});
