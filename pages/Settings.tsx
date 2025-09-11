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
import { Text } from "@/components/ui/text";
import store from "@/stores";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { ColorSchemeName, ScrollView, View } from "react-native";

const ThemeBlock = observer(function ThemeBlock() {
    const label = useMemo(
        () =>
            store.ui.theme === "dark" ? "Dark"
            : store.ui.theme === "light" ? "Light"
            : "System default",
        [],
    );

    return (
        <View className="gap-1.5">
            <Text>Theme</Text>
            <Dialog>
                <DialogTrigger asChild>
                    <View>
                        <Text>Choose theme</Text>
                        <Text>{label}</Text>
                    </View>
                </DialogTrigger>
                <DialogContent>
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
                        <View className="flex flex-row items-center gap-3">
                            <RadioGroupItem value="light" id="r1" />
                            <Label htmlFor="r1">Light</Label>
                        </View>
                        <View className="flex flex-row items-center gap-3">
                            <RadioGroupItem value="dark" id="r2" />
                            <Label htmlFor="r2">Dark</Label>
                        </View>
                        <View className="flex flex-row items-center gap-3">
                            <RadioGroupItem value="system" id="r3" />
                            <Label htmlFor="r3">System default</Label>
                        </View>
                    </RadioGroup>
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
                <View className="gap-1.5">
                    <Text>Cache</Text>
                    <Dialog>
                        <DialogTrigger asChild>
                            <View>
                                <Text>Clear cache</Text>
                                <Text>
                                    Remove all cached documents for
                                    this account.
                                </Text>
                            </View>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Clear cache</DialogTitle>
                            </DialogHeader>
                            <Text>
                                Document cache will be cleared
                            </Text>
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
            </View>
        </ScrollView>
    );
}
