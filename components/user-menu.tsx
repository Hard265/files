import { Button } from "@/components/ui/button";
import {
    Popover,
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
import { useTheme } from "@react-navigation/native";
import { UserAvatar } from "./user-avatar";

export const UserMenu = observer(function UserMenu() {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStack>()
    const popoverTriggerRef = React.useRef<TriggerRef>(null);

    async function onSignOut() {
        popoverTriggerRef.current?.close();
        // TODO: Sign out and navigate to sign in screen
    }

    return (
        <Popover>
            <PopoverTrigger asChild ref={popoverTriggerRef}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full size-12"
                >
                    <UserAvatar email={store.auth.user?.email} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                side="bottom"
                className="p-0 w-80"
            >
                <View className="p-3 border-b border-border gap-3">
                    <View className="flex-row items-center gap-3">
                        <UserAvatar />
                        <View className="flex-1">
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
                    <View className="flex-row flex-wrap gap-3 py-0.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onPress={() => {
                                // TODO: Navigate to account settings screen
                            }}
                        >
                            <Icon
                                name="settings_1_line"
                                size={20}
                                color={colors.text}
                            />
                            <Text>Settings</Text>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onPress={onSignOut}
                        >
                            <Icon
                                name="exit_line"
                                size={20}
                                color={colors.text}
                            />
                            <Text>Sign Out</Text>
                        </Button>
                    </View>
                </View>
                <Button
                    variant="ghost"
                    size="lg"
                    className="justify-start h-16 px-3 rounded-none gap-3 rounded-b-md sm:h-14"
                    onPress={() => {
                        // TODO: Navigate to add account screen
                    }}
                >
                    <View className="items-center justify-center size-10">
                        <View className="items-center justify-center border border-dashed rounded-full border-border bg-muted/50 size-7">
                            <Icon
                                name="add_circle_line"
                                size={20}
                                color={colors.text}
                            />
                        </View>
                    </View>
                    <Text>Add account</Text>
                </Button>
            </PopoverContent>
        </Popover>
    );
});
