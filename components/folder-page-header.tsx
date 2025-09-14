import { RootStackParamsList } from "@/Router";
import { useTheme } from "@react-navigation/native";
import {
    NativeStackHeaderProps,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { memo, useCallback, useMemo, useState } from "react";
import {
    getDefaultHeaderHeight,
    HeaderBackButton,
} from "@react-navigation/elements";
import Animated, {
    interpolateColor,
    runOnJS,
    SlideInRight,
    SlideOutRight,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    Pressable,
    TextInput,
    useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserMenu } from "@/components/user-menu";
import { PlusMenu } from "@/components/plus-menu";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";
import { THEME } from "@/lib/theme";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import useBackHandler from "@/hooks/useBackHandler";
import React from "react";

const HEADER_ANIMATION_DURATION = 250;

const FolderPageHeader = memo(function Header({
    navigation,
    route,
    ...props
}: {
    navigation: NativeStackNavigationProp<RootStackParamsList>;
} & DrawerHeaderProps) {
    const dimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const headerHeight = getDefaultHeaderHeight(
        dimensions,
        false,
        insets.top,
    );

    const searchRef = React.useRef<TextInput>(null);

    const theme = useTheme();
    const [isFocusedState, setIsFocusedState] = useState(false);
    const searchIsFocused = useSharedValue(false);

    const headerStyle = useAnimatedStyle(() => {
        "worklet";
        return {
            backgroundColor: withTiming(
                interpolateColor(
                    searchIsFocused.value ? 1 : 0,
                    [0, 1],
                    [
                        theme.colors.background,
                        THEME[theme.dark ? "dark" : "light"].accent,
                    ],
                ),
                {
                    duration: HEADER_ANIMATION_DURATION,
                },
            ),
        };
    });

    const onFocusChange = useCallback(
        (focused: boolean) => {
            "worklet";
            searchIsFocused.value = focused;
        },
        [searchIsFocused],
    );

    useAnimatedReaction(
        () => searchIsFocused.value,
        (current) => {
            runOnJS(setIsFocusedState)(current);
        },
    );

    useBackHandler(isFocusedState, () => {
        searchIsFocused.value = false;
        return true;
    });

    const drawerHandler = useCallback(() => {
        if (isFocusedState) {
            searchRef.current?.blur();
            return;
        }
        navigation.openDrawer();
    }, [isFocusedState, navigation]);

    return (
        <Animated.View
            style={[
                headerStyle,
                {
                    paddingTop: insets.top,
                    height: headerHeight,
                },
            ]}
            className="flex-row items-center justify-between px-2"
        >
            {route.name === "Root" ?
                <HeaderBackButton
                    backImage={() => (
                        <Icon
                            name={
                                isFocusedState ? "close_line" : (
                                    "menu_line"
                                )
                            }
                            size={24}
                        />
                    )}
                    onPress={drawerHandler}
                    tintColor={theme.colors.text}
                />
            :   <HeaderBackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                    tintColor={theme.colors.text}
                />
            }
            <Animated.View className="items-center justify-center flex-1">
                <TextInput
                    ref={searchRef}
                    onFocus={() => onFocusChange(true)}
                    onBlur={() => onFocusChange(false)}
                    placeholder="Search"
                    className={cn(
                        "dark:bg-input/30 border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9",
                    )}
                    keyboardType="web-search"
                    returnKeyType="search"
                    placeholderTextColor={
                        THEME[theme.dark ? "dark" : "light"]
                            .mutedForeground
                    }
                />
            </Animated.View>
            {!isFocusedState && (
                <Animated.View
                    entering={SlideInRight.duration(
                        HEADER_ANIMATION_DURATION,
                    )}
                    exiting={SlideOutRight.duration(
                        HEADER_ANIMATION_DURATION,
                    )}
                    className="flex-row items-center justify-center pl-3"
                >
                    <PlusMenu />
                    <Pressable className="p-2.5">
                        <Icon name="user_add_line" size={24} />
                    </Pressable>
                    {!route.params?.id && <UserMenu />}
                </Animated.View>
            )}
        </Animated.View>
    );
});

export default FolderPageHeader;
