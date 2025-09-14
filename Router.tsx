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
import { SharePage } from "./pages/Share";
import SettingsPage from "./pages/Settings";
import FolderPageHeader from "./components/folder-page-header";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FolderDrawerContent from "./components/folder-drawer";

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
        tab?: "people" | "links";
    };
    Share: {
        refs: __ref[];
    };
    Settings: undefined;
};

// --- Folder Stack ---
const FolderStack = createNativeStackNavigator({
    screens: {
        Folder: {
            screen: FolderPage,
            linking: {
                path: "/folders/:id",
            },
        },
    },
    screenOptions: {
        headerShown: false,
    },
});

// --- Drawer ---
const FolderDrawer = createDrawerNavigator({
    screens: {
        Home: { screen: HomePage, linking: { path: "/" } },
        Folder: { screen: FolderStack },
    },
    drawerContent: FolderDrawerContent,
    screenOptions: ({ navigation }) => ({
        header: (props) => (
            <FolderPageHeader
                {...props}
                navigation={navigation as any}
            />
        ),
        popToTopOnBlur: false,
    }),
});

// --- Root Stack ---
const RootStack = createNativeStackNavigator({
    groups: {
        Unauthenticated: {
            if: useIsUnauthenticated,
            screens: {
                SignIn: {
                    screen: SignInPage,
                    options: { title: "Sign in" },
                    linking: { path: "/sign-in" },
                },
                SignUp: {
                    screen: SignUpPage,
                    options: { title: "Sign up" },
                    linking: { path: "/sign-up" },
                },
                VerifyEmail: {
                    screen: VerifyEmailPage,
                    options: { title: "Verify email" },
                    linking: { path: "/verify-email" },
                },
                ForgotPassword: {
                    screen: ForgotPasswordPage,
                    options: { title: "Forgot password" },
                    linking: { path: "/forgot-password" },
                },
            },
        },
        Authenticated: {
            if: useIsAuthenticated,
            screens: {
                Home: {
                    screen: FolderDrawer,
                    options: { headerShown: false },
                },
                ManageAccess: {
                    screen: ManageAccessPage,
                    options: { title: "Manage access" },
                    initialParams: { tab: "people" },
                    linking: { path: "/manage-access/:tab" },
                },
                Share: {
                    screen: SharePage,
                    options: {
                        presentation: "formSheet",
                        title: "Share",
                    },
                    linking: { path: "/share" },
                },
                Settings: {
                    screen: SettingsPage,
                    linking: { path: "/settings" },
                },
            },
        },
    },
    screenOptions: ({ theme }) => ({
        headerStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: false,
        freezeOnBlur: true,
    }),
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
