import { SocialConnections } from "@/components/social-connections";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import useFormReducer from "@/hooks/useFormReducer";
import { RootStackParamsList } from "@/Router";
import api from "@/services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosError } from "axios";
import _ from "lodash";
import * as React from "react";
import { Pressable, type TextInput, View } from "react-native";

export function SignUpForm() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const passwordInputRef = React.useRef<TextInput>(null);
    const [submitting, setSubmitting] = React.useState(false);
    const {
        state,
        action: onChange,
        setErrors,
    } = useFormReducer({
        email: "",
        password: "",
    });

    function onEmailSubmitEditing() {
        passwordInputRef.current?.focus();
    }

    async function onSubmit() {
        try {
            await api.post("/users", state.values);
            navigation.navigate("VerifyEmail", {
                email: state.values.email,
            });
        } catch (err) {
            const e = err as unknown as AxiosError;
            if (_.isArray((e.response?.data as any).detail)) {
                transformValueErrors(
                    (e.response?.data as any).detail,
                ).forEach(({ field, errors }) => {
                    setErrors(
                        field as keyof typeof state.values,
                        errors,
                    );
                });
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <View className="gap-6">
            <Card className="shadow-none border-border/0 sm:border-border sm:shadow-sm sm:shadow-black/5">
                <CardHeader>
                    <CardTitle className="text-xl text-center sm:text-left">
                        Create your account
                    </CardTitle>
                    <CardDescription className="text-center sm:text-left">
                        Welcome! Please fill in the details to get
                        started.
                    </CardDescription>
                </CardHeader>
                <CardContent className="gap-6">
                    <View className="gap-6">
                        <View className="gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="m@example.com"
                                keyboardType="email-address"
                                autoComplete="email"
                                value={state.values.email}
                                onChangeText={(email) =>
                                    onChange("email", email)
                                }
                                autoCapitalize="none"
                                onSubmitEditing={onEmailSubmitEditing}
                                returnKeyType="next"
                                submitBehavior="submit"
                            />
                        </View>
                        <View className="gap-1.5">
                            <View className="flex-row items-center">
                                <Label htmlFor="password">
                                    Password
                                </Label>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="h-4 px-1 py-0 ml-auto web:h-fit sm:h-4"
                                    onPress={() => {
                                        navigation.navigate(
                                            "ForgotPassword",
                                        );
                                    }}
                                >
                                    <Text className="font-normal leading-4">
                                        Forgot your password?
                                    </Text>
                                </Button>
                            </View>
                            <Input
                                ref={passwordInputRef}
                                value={state.values.password}
                                onChangeText={(password) =>
                                    onChange("password", password)
                                }
                                id="password"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={onSubmit}
                            />
                        </View>
                        <Button
                            disabled={submitting}
                            className="w-full"
                            onPress={onSubmit}
                        >
                            <Text>Continue</Text>
                        </Button>
                    </View>
                    <Text className="items-center text-sm text-center">
                        Already have an account?{" "}
                        <Pressable
                            onPress={() => {
                                navigation.popTo("SignIn");
                            }}
                        >
                            <Text
                                onPress={() => {}}
                                className="text-sm underline underline-offset-4"
                            >
                                Sign up
                            </Text>
                        </Pressable>
                    </Text>
                    <View className="flex-row items-center">
                        <Separator className="flex-1" />
                        <Text className="px-4 text-sm text-muted-foreground">
                            or
                        </Text>
                        <Separator className="flex-1" />
                    </View>
                    <SocialConnections />
                </CardContent>
            </Card>
        </View>
    );
}

function transformValueErrors(e: AxiosError<any, any>) {
    const grouped = _.groupBy(
        _.filter(e, { type: "value_error" }),
        (err) => _.last(err.loc),
    );
    return _.map(grouped, (errors, field) => ({
        field,
        errors: _.map(errors, "ctx.reason"),
    }));
}
