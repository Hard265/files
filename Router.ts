import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    useIsAuthenticated,
    useIsUnauthenticated,
} from "./hooks/useSession";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import FolderPage from "./pages/Folder";
import SignUpPage from "./pages/SignUp";
import VerifyEmailPage from "./pages/VerifyEmail";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ManageAccessPage from "./pages/ManageAccess";

export type RootStackParamsList = {
    SignIn: undefined;
    SignUp: undefined;
    VerifyEmail: {
        email: string;
    };
    ForgotPassword: undefined;
    Home: undefined;
    Folder: {
        id: string;
    };
    ManageAccess: {
        ref: __ref;
    };
};

const RootStack = createNativeStackNavigator({
    groups: {
        Unauthenticated: {
            if: useIsUnauthenticated,
            screens: {
                SignIn: {
                    screen: SignInPage,
                    options: {
                        title: "Sign in",
                    },
                },
                SignUp: {
                    screen: SignUpPage,
                    options: {
                        title: "Sign up",
                    },
                },
                VerifyEmail: {
                    screen: VerifyEmailPage,
                    options: {
                        title: "Verify email",
                    },
                },
                ForgotPassword: {
                    screen: ForgotPasswordPage,
                    options: {
                        title: "Forgot password",
                    },
                },
            },
        },
        Authenticated: {
            if: useIsAuthenticated,
            screens: {
                Home: {
                    screen: HomePage,
                },
                Folder: {
                    screen: FolderPage,
                    options: {
                        animation: "slide_from_right",
                    },
                },
                ManageAccess: {
                    screen: ManageAccessPage,
                    options: {
                        title: "Manage access",
                    },
                },
            },
        },
    },
    screenOptions: ({ theme }) => ({
        headerStyle: {
            backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        freezeOnBlur: true,
    }),
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
