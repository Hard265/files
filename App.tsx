import "@/global.css";
import { ApolloProvider } from "@apollo/client/react";
import Navigation from "@/Router";
import { useColorScheme, View } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import client from "./services/client";
import { setBackgroundColorAsync } from "expo-system-ui";
import ErrorBoundary from "./components/ErrorBoundary";
import { Text } from "./components/Text";
import { useFonts } from "expo-font";

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

    if (!fontsLoaded || fontsErr) {
        return null;
    }
    return (
        <ErrorBoundary fallback={<AppError />}>
            <ApolloProvider client={client}>
                <Navigation theme={theme} />
            </ApolloProvider>
        </ErrorBoundary>
    );
}

function AppError() {
    return (
        <View className="items-center justify-center flex-1">
            <Text variant="largeTitle">Something went wrong</Text>
        </View>
    );
}
