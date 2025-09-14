import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    List,
    ListGroup,
    ListItem,
    ListItemSubtitle,
    ListItemTitle,
    ListLabel,
} from "@/components/ui/list";
import {
    RadioGroupItem,
    RadioGroup,
} from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import store from "@/stores";
import { DataUsage } from "@/stores/app";
import { useApolloClient } from "@apollo/client/react";
import { observer } from "mobx-react-lite";
import { memo, useCallback, useMemo } from "react";
import {
    ColorSchemeName,
    Pressable,
    ScrollView,
    View,
} from "react-native";

const ThemeBlock = observer(function ThemeBlock() {
    const label = useMemo(
        () =>
            store.ui.theme === "dark" ? "Dark"
            : store.ui.theme === "light" ? "Light"
            : "System default",
        [],
    );

    return (
        <ListGroup>
            <ListLabel>Theme</ListLabel>
            <Dialog>
                <DialogTrigger asChild>
                    <ListItem>
                        <ListItemTitle>Choose theme</ListItemTitle>
                        <ListItemSubtitle>{label}</ListItemSubtitle>
                    </ListItem>
                </DialogTrigger>
                <DialogContent className="min-w-[336px]">
                    <DialogHeader>
                        <DialogTitle>Choose theme</DialogTitle>
                    </DialogHeader>
                    <RadioGroup
                        value={store.ui.theme || "system"}
                        onValueChange={(theme) =>
                            store.ui.setTheme(
                                theme === "system" ? null : (
                                    (theme as ColorSchemeName)
                                ),
                            )
                        }
                    >
                        <DialogClose>
                            <View className="flex flex-row items-center gap-3">
                                <RadioGroupItem
                                    value="light"
                                    id="r1"
                                />
                                <Label nativeID="r1">Light</Label>
                            </View>
                        </DialogClose>
                        <DialogClose>
                            <View className="flex flex-row items-center gap-3">
                                <RadioGroupItem
                                    value="dark"
                                    id="r2"
                                />
                                <Label nativeID="r2">Dark</Label>
                            </View>
                        </DialogClose>
                        <DialogClose>
                            <View className="flex flex-row items-center gap-3">
                                <RadioGroupItem
                                    value="system"
                                    nativeID="r3"
                                    id="r3"
                                />
                                <Label nativeID="r3">
                                    System default
                                </Label>
                            </View>
                        </DialogClose>
                    </RadioGroup>
                </DialogContent>
            </Dialog>
        </ListGroup>
    );
});

const CacheBlock = memo(function CacheBlock() {
    const client = useApolloClient();
    const clearCache = useCallback(() => {
        client.clearStore();
    }, [client]);

    return (
        <ListGroup>
            <ListLabel>Cache</ListLabel>
            <Dialog>
                <DialogTrigger asChild>
                    <ListItem>
                        <ListItemTitle>Clear cache</ListItemTitle>
                        <ListItemSubtitle>
                            Remove all cached documents for this
                            account.
                        </ListItemSubtitle>
                    </ListItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear cache</DialogTitle>
                    </DialogHeader>
                    <Text>Documents cache will be cleared</Text>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost">
                                <Text>Cancel</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onPress={clearCache}
                                variant="destructive"
                            >
                                <Text>Ok</Text>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ListGroup>
    );
});

const DataUsageBlock = observer(function DataUsageBlock() {
    return (
        <ListGroup>
            <ListLabel>Data usage</ListLabel>
            <Dialog>
                <DialogTrigger asChild>
                    <ListItem className="flex-row items-center justify-between">
                        <View className="flex flex-col flex-1">
                            <ListItemTitle>
                                Transfer files only over WiFi
                            </ListItemTitle>
                            <ListItemSubtitle>
                                Uploading and updating of files will
                                pause when WiFi connection is not
                                available
                            </ListItemSubtitle>
                        </View>
                        <Switch
                            checked={store.app.isWifiOnly}
                            onCheckedChange={(checked) =>
                                store.app.setDataUsage(
                                    checked ?
                                        DataUsage.WIFI_ONLY
                                    :   DataUsage.ALL,
                                )
                            }
                        />
                    </ListItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Data usage warning</DialogTitle>
                    </DialogHeader>
                    <Text>
                        Transfering files over mobile data may incur
                        additional charges, depending on your mobile
                        data plan.
                    </Text>
                    <DialogFooter className="flex-row justify-between">
                        <DialogClose asChild>
                            <Button variant="ghost">
                                <Text>Learn more</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="ghost">
                                <Text>Cancel</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onPress={() => {
                                    store.app.setDataUsage(
                                        DataUsage.WIFI_ONLY,
                                    );
                                }}
                                variant="ghost"
                            >
                                <Text>Ok</Text>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ListGroup>
    );
});

export default function SettingsPage() {
    return (
        <ScrollView>
            <List>
                <ThemeBlock />
                <CacheBlock />
                <DataUsageBlock />
            </List>
        </ScrollView>
    );
}
