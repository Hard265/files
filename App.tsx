import "@/global.css";
import Navigation from "@/Router";
import { ApolloProvider } from "@apollo/client/react";
import {
    DarkTheme,
    ThemeProvider,
    DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import ErrorBoundary from "./components/ErrorBoundary";
import client from "./services/client";
import { MenuProvider } from "react-native-popup-menu";
import LoadingPage from "./components/LoadingPage";
import FatalError from "./components/FatalError";

export default function App() {
    const colorSchemeName = useColorScheme();
    const [fontsLoaded, fontsErr] = useFonts({
        MingCute: require("./assets/fonts/mingcute.ttf"),
        RoobertBold: require("./assets/fonts/Roobert-Bold.otf"),
        NeueMontrealRegular: require("./assets/fonts/NeueMontreal-Regular.otf"),
    });

    const theme = useMemo(
        () => (colorSchemeName === "dark" ? DarkTheme : DefaultTheme),
        [colorSchemeName],
    );

    useEffect(() => {
        setBackgroundColorAsync(theme.colors.background);
    }, [colorSchemeName, theme.colors.background]);

    if (fontsErr) return <FatalError />;

    if (!fontsLoaded) return <LoadingPage theme={theme} />;

    return (
        <ThemeProvider value={theme}>
            <ErrorBoundary fallback={<FatalError />}>
                <ApolloProvider client={client}>
                    <MenuProvider>
                        <Navigation theme={theme}/>
                    </MenuProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}
