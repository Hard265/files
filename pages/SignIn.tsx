import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import useFormReducer from "@/hooks/useFormReducer";
import api from "@/services/api";
import store from "@/stores";
import { AxiosError } from "axios";
import _ from "lodash";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const {
        state,
        action: onChange,
        setErrors,
    } = useFormReducer({
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await api.post("/token", state.values);
            await store.auth.signin({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                tokenType: data.token_type,
            });
        } catch (err) {
            const e = err as unknown as AxiosError;
            if (_.isArray((e.response?.data as any).detail)) {
                transformValueErrors((e.response?.data as any).detail).forEach(
                    ({ field, errors }) => {
                        setErrors(field as keyof typeof state.values, errors);
                    },
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerClassName="">
            <View className="px-4 py-2 gap-y-1">
                <Text>Email address</Text>
                <Input
                    value={state.values.email}
                    onChangeText={(email) => onChange("email", email)}
                    errors={state.errors.email}
                />
            </View>
            <View className="px-4 py-2 gap-y-1">
                <Text>Password</Text>
                <Input
                    value={state.values.password}
                    onChangeText={(password) => onChange("password", password)}
                    errors={state.errors.password}
                />
            </View>
            <View className="px-4 py-2 gap-y-1">
                <Button
                    loading={loading}
                    disabled={loading}
                    onPress={handleSubmit}
                >
                    <Text>Sign in</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
function transformValueErrors(e: AxiosError<any, any>) {
    const grouped = _.groupBy(_.filter(e, { type: "value_error" }), (err) =>
        _.last(err.loc),
    );
    return _.map(grouped, (errors, field) => ({
        field,
        errors: _.map(errors, "ctx.reason"),
    }));
}
