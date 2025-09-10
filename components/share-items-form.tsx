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

export default function ShareItemsForm() {
    const { state, action: dispatchEdit } = useFormReducer({
        email: "",
        comment: "",
    });

    return (
        <Card className="shadow-none border-border/0 sm:border-border sm:shadow-sm sm:shadow-black/5">
            <CardHeader>
                <CardTitle className="text-xl text-center sm:text-left">
                    Add people to share with
                </CardTitle>
                <CardDescription className="text-center sm:text-left">
                    
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                                dispatchEdit("email", email)
                            }
                            autoCapitalize="none"
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                    </View>
                </View>
                <View className="gap-6">
                    <View className="gap-1.5">
                          <Textarea placeholder="Type your message here." />
                    </View>
                </View>
            </CardContent>
        </Card>
    );
}
