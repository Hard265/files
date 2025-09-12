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
    RadioGroupItem,
    RadioGroup,
} from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import store from "@/stores";
import { DataUsage } from "@/stores/app";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
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
        <View className="gap-1.5 px-4">
            <Text>Theme</Text>
            <Dialog>
                <DialogTrigger asChild>
                    <Pressable>
                        <Text>Choose theme</Text>
                        <Text>{label}</Text>
                    </Pressable>
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
        </View>
    );
});

const CacheBlock = memo(function CacheBlock() {
    return (
        <View className="gap-1.5 px-4">
            <Text variant="h4">Cache</Text>
            <Dialog>
                <DialogTrigger asChild>
                    <Pressable>
                        <Text variant="h3">Clear cache</Text>
                        <Text>
                            Remove all cached documents for this
                            account.
                        </Text>
                    </Pressable>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear cache</DialogTitle>
                    </DialogHeader>
                    <Text>Document cache will be cleared</Text>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="ghost">
                                <Text>Cancel</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="ghost">
                                <Text>Ok</Text>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </View>
    );
});

const DataUsageBlock = observer(function DataUsageBlock() {
    return (
        <View className="gap-1.5 px-4">
            <Text variant="h4">Data usage</Text>
            <Dialog>
                <DialogTrigger asChild>
                    <Pressable>
                        <View>
                            <Text variant="h3">
                                Transfer files only over WiFi
                            </Text>
                            <Text>
                                Uploading and updating of files will
                                pause when WiFi connection is not
                                available
                            </Text>
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
                    </Pressable>
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
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="ghost">
                                <Text>Learn more</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="ghost">
                                <Text>Cancel</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose>
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
        </View>
    );
});

export default function SettingsPage() {
    return (
        <ScrollView>
            <View className="flex-col gap-6">
                <ThemeBlock />
                <CacheBlock />
                <DataUsageBlock />
            </View>
        </ScrollView>
    );
}
