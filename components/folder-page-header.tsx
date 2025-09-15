import { useTheme } from "@react-navigation/native";
import React, { memo, useCallback, useRef } from "react";
import {
    getDefaultHeaderHeight,
    HeaderBackButton,
} from "@react-navigation/elements";
import Animated, {
    interpolateColor,
    SlideInRight,
    SlideOutRight,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Pressable, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";

// Local Imports
import { UserMenu } from "@/components/user-menu";
import { PlusMenu } from "@/components/plus-menu";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";
import { THEME } from "@/lib/theme";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import useBackHandler from "@/hooks/useBackHandler";
import { infolderSubject } from "@/pages/Folder";
import store from "@/stores";

const HEADER_ANIMATION_DURATION = 250;

const FolderPageHeader = observer(function Header({
    navigation,
    route,
}: DrawerHeaderProps) {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const headerHeight = getDefaultHeaderHeight(dimensions, false, insets.top);

    const searchInputRef = useRef<TextInput>(null);
    const searchOpen = useSharedValue(store.ui.searchOpen ? 1 : 0);

    const closeSearch = useCallback(() => {
        store.ui.setSearchOpen(false);
        searchOpen.value = withTiming(0, {
            duration: HEADER_ANIMATION_DURATION,
        });
        searchInputRef.current?.blur();
    }, [searchOpen]);

    const openSearch = useCallback(() => {
        store.ui.setSearchOpen(true);
        searchOpen.value = withTiming(1, {
            duration: HEADER_ANIMATION_DURATION,
        });
    }, [searchOpen]);

    useBackHandler(store.ui.searchOpen, () => {
        closeSearch();
        return true; // Prevent default back action
    });

    const drawerHandler = useCallback(() => {
        if (store.ui.searchOpen) {
            closeSearch();
            return;
        }
        navigation.openDrawer();
    }, [navigation, closeSearch]);

    const headerStyle = useAnimatedStyle(() => {
        "worklet";
        return {
            backgroundColor: interpolateColor(
                searchOpen.value,
                [0, 1],
                [
                    theme.colors.background,
                    THEME[theme.dark ? "dark" : "light"].accent,
                ],
            ),
        };
    });

    const isHome = route.name === "Home";

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
            {isHome ?
                <HeaderBackButton
                    backImage={() => (
                        <Icon
                            name={
                                store.ui.searchOpen ?
                                    "close_line"
                                :   "menu_line"
                            }
                            size={24}
                        />
                    )}
                    onPress={drawerHandler}
                    tintColor={theme.colors.text}
                />
            :   <HeaderBackButton
                    onPress={() => infolderSubject.next("GO_BACK")}
                    tintColor={theme.colors.text}
                />
            }

            <View className="items-center justify-center flex-1">
                <TextInput
                    ref={searchInputRef}
                    onFocus={openSearch}
                    onBlur={(e) => {
                        if (!e.nativeEvent.text) {
                            closeSearch();
                        }
                    }}
                    placeholder="Search"
                    className={cn(
                        "dark:bg-input/30 border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9",
                    )}
                    keyboardType="web-search"
                    returnKeyType="search"
                    placeholderTextColor={
                        THEME[theme.dark ? "dark" : "light"].mutedForeground
                    }
                />
            </View>

            {!store.ui.searchOpen && (
                <Animated.View
                    entering={SlideInRight.duration(HEADER_ANIMATION_DURATION)}
                    exiting={SlideOutRight.duration(HEADER_ANIMATION_DURATION)}
                    className="flex-row items-center justify-center pl-3"
                >
                    <PlusMenu />
                    {!isHome && (
                        <Pressable
                            onPress={() => alert("Add user pressed!")}
                            className="p-2.5"
                        >
                            <Icon name="user_add_line" size={24} />
                        </Pressable>
                    )}
                    {!route.params?.id && <UserMenu />}
                </Animated.View>
            )}
        </Animated.View>
    );
});

export default FolderPageHeader;
