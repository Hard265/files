import "@/global.css";
import Navigation from "@/Router";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import client from "./services/client";
import { MenuProvider } from "react-native-popup-menu";
import LoadingPage from "./components/LoadingPage";
import FatalError from "./components/FatalError";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "./lib/theme";
export default function App() {
    const colorSchemeName = useColorScheme();
    const [fontsLoaded, fontsErr] = useFonts({
        MingCute: require("./assets/fonts/mingcute.ttf"),
        RoobertBold: require("./assets/fonts/Roobert-Bold.otf"),
        NeueMontrealRegular: require("./assets/fonts/NeueMontreal-Regular.otf"),
    });

    const theme = useMemo(
        () =>
            NAV_THEME[
                (colorSchemeName as "light" | "dark") || "light"
            ],
        [colorSchemeName],
    );

    useEffect(() => {
        setBackgroundColorAsync(theme.colors.background);
    }, [colorSchemeName, theme.colors.background]);

    if (fontsErr) return <FatalError />;

    if (!fontsLoaded) return <LoadingPage theme={theme} />;

    return (
        <ThemeProvider value={theme}>
            <ApolloProvider client={client}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <MenuProvider>
                        <Navigation theme={theme} />
                        <PortalHost />
                    </MenuProvider>
                </GestureHandlerRootView>
            </ApolloProvider>
            <StatusBar
                style={colorSchemeName === "dark" ? "light" : "dark"}
            />
        </ThemeProvider>
    );
}
