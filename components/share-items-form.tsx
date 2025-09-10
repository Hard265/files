import useFormReducer from "@/hooks/useFormReducer";
import { View } from "react-native";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "./ui/select";
import { Text } from "./ui/text";
import {
    RouteProp,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { RoleEnum } from "@/graphql/__generated__/graphql";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { RootStackParamsList } from "@/Router";

export default function ShareItemsForm() {
    const theme = useTheme();
    const route = useRoute<RouteProp<RootStackParamsList, "Share">>();
    const { state, action: dispatchEdit } = useFormReducer({
        email: "",
        comment: "",
        role: RoleEnum.Viewer,
    });
    const [roleOption, setRole] = useState<
        { label: string; value: RoleEnum } | undefined
    >({
        label: "Can view",
        value: RoleEnum.Viewer,
    });

    const onSubmit = useCallback(() => {
        console.log("Submit", state.values);
    },[]);

    return (
        <Card className="shadow-none border-border/0 sm:border-border sm:shadow-sm sm:shadow-black/5">
            <CardHeader className="pt-6 sm:pb-1 sm:pt-0 px-6 sm:px-8">
                <CardTitle className="text-xl sm:text-left">
                    Share {route.params.refs.length} item
                    {route.params.refs.length > 1 ? "s" : ""}
                </CardTitle>
                <CardDescription className="sm:text-left">
                    Enter email addresses to share with people
                </CardDescription>
            </CardHeader>
            <CardContent>
                <View className="gap-6">
                    <View className="gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <View className="flex-row items-center">
                            <Input
                                id="email"
                                placeholder="Add an email address"
                                keyboardType="email-address"
                                autoComplete="email"
                                value={state.values.email}
                                onChangeText={(email) =>
                                    dispatchEdit("email", email)
                                }
                                autoCapitalize="none"
                                returnKeyType="next"
                                submitBehavior="submit"
                                className="flex-1 rounded-r-none"
                            />
                            <Select
                                value={roleOption}
                                onValueChange={(option) => {
                                    setRole(option as any);
                                }}
                            >
                                <SelectTrigger className="rounded-l-none w-[120px]">
                                    <Text>Can view</Text>
                                </SelectTrigger>
                                <SelectContent className=" w-[120px]">
                                    <SelectGroup>
                                        <SelectLabel>
                                            Set permission
                                        </SelectLabel>
                                        <SelectItem
                                            value={RoleEnum.Viewer}
                                            label="Can view"
                                        />
                                        <SelectItem
                                            value={RoleEnum.Editor}
                                            label="Can edit"
                                        />
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </View>
                    </View>
                    <View className="gap-1.5">
                        <Textarea
                            placeholder="Type your message here."
                            placeholderClassName="text-white/50"
                            numberOfLines={6}
                            value={state.values.comment}
                            onChangeText={(comment) =>
                                dispatchEdit("comment", comment)
                            }
                            placeholderTextColor={
                                theme.colors.text + "40"
                            }
                        />
                    </View>
                    <View className="gap-1.5">
                        <Text>
                            Any one with the link {roleOption?.label}
                        </Text>
                        <View className="gap-6 flex-row justify-end items-center mt-4">
                            <Button variant="outline">
                                <Text>Copy link</Text>
                            </Button>
                            <Button onPress={onSubmit}>
                                <Text>Send</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </CardContent>
        </Card>
    );
}
