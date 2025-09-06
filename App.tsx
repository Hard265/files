import "@/global.css";
import Navigation from "@/Router";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@react-navigation/native";
import * as Font from "expo-font";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import client from "./services/client";
import LoadingPage from "./components/LoadingPage";
import FatalError from "./components/FatalError";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "./lib/theme";
export default function App() {
    const colorSchemeName = useColorScheme();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [fontsErr, setFontsErr] = useState<Error | null>(null);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    MingCute: require("./assets/fonts/mingcute.ttf"),
                    NeueMontrealBook: require("./assets/fonts/ppneuemontreal-book.otf"),
                    NeueMontrealBold: require("./assets/fonts/ppneuemontreal-bold.otf"),
                    NeueMontrealItalic: require("./assets/fonts/ppneuemontreal-italic.otf"),
                    NeueMontrealMedium: require("./assets/fonts/ppneuemontreal-medium.otf"),
                    NeueMontrealSemiBoldItalic: require("./assets/fonts/ppneuemontreal-semibolditalic.otf"),
                    NeueMontrealThin: require("./assets/fonts/ppneuemontreal-thin.otf"),
                });
            } catch (err) {
                setFontsErr(err as Error);
            } finally {
                setFontsLoaded(true);
            }
        }
        loadFonts();
    }, []);

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
                    <Navigation theme={theme} />
                    <PortalHost />
                </GestureHandlerRootView>
            </ApolloProvider>
            <StatusBar
                style={colorSchemeName === "dark" ? "light" : "dark"}
            />
        </ThemeProvider>
    );
}
