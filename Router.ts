import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    useIsAuthenticated,
    useIsUnauthenticated,
} from "./hooks/useSession";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import FolderPage from "./pages/Folder";

export type RootStackParamsList = {
    SignIn: undefined;
    Home: undefined;
    Folder: {
        id: string;
    };
};

const RootStack = createNativeStackNavigator({
    groups: {
        Unauthenticated: {
            if: useIsUnauthenticated,
            screens: {
                SignIn: {
                    screen: SignInPage,
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
                },
            },
        },
    },
    screenOptions: ({ theme }) => ({
        headerStyle: {
            backgroundColor: theme.colors.background,
        },
    }),
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
