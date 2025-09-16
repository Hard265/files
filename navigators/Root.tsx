import { useIsAuthenticated } from "@/hooks/useSession";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ManageAccessPage from "@/pages/ManageAccess";
import SettingsPage from "@/pages/Settings";
import { SharePage } from "@/pages/Share";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import VerifyEmailPage from "@/pages/VerifyEmail";
import HomeDrawer, { type HomeParamList } from "./Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    VerifyEmail: undefined;
    ForgotPassword: undefined;
    App: NavigatorScreenParams<HomeParamList>;
    ManageAccess: {
        ref: __ref;
        tab: "people" | "links";
    };
    Share: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? "App" : "SignIn"}>
            {!isAuthenticated ?
                <Stack.Group>
                    <Stack.Screen name="SignIn" component={SignInPage} />
                    <Stack.Screen name="SignUp" component={SignUpPage} />
                    <Stack.Screen
                        name="VerifyEmail"
                        component={VerifyEmailPage}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordPage}
                    />
                </Stack.Group>
            :   <Stack.Group>
                    <Stack.Screen
                        name="App"
                        component={HomeDrawer}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ManageAccess"
                        component={ManageAccessPage}
                    />
                    <Stack.Screen name="Share" component={SharePage} />
                    <Stack.Screen name="Settings" component={SettingsPage} />
                </Stack.Group>
            }
        </Stack.Navigator>
    );
}

export default RootStack;
