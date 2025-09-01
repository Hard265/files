import React from "react";
import {
    View,
    StyleSheet,
    ViewStyle,
    DimensionValue,
    ColorValue,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type SkeletonProps = {
    children: React.ReactNode;
    width?: DimensionValue;
    height?: DimensionValue;
    duration?: number;
    readonly shimmerColors?: [
        ColorValue,
        ColorValue,
        ...ColorValue[],
    ];
    style?: ViewStyle;
};

// Define default colors for light mode
const defaultColors = [
    "#e0e0e0",
    "#f5f5f5",
    "#e0e0e0",
] as SkeletonProps["shimmerColors"];

export function Skeleton({
    children,
    width,
    height,
    duration = 1200,
    shimmerColors = defaultColors,
    style,
}: SkeletonProps) {
    const translateX = useSharedValue(-200);

    React.useEffect(() => {
        translateX.value = withRepeat(
            withTiming(200, { duration }),
            -1,
            false,
        );
    }, [duration, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { rotate: "-45deg" },
        ],
    }));

    return (
        <MaskedView
            style={[{ width, height }, style]}
            maskElement={
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                    }}
                >
                    {children}
                </View>
            }
        >
            <Animated.View
                style={[StyleSheet.absoluteFill, animatedStyle]}
            >
                <LinearGradient
                    colors={
                        shimmerColors as NonNullable<
                            SkeletonProps["shimmerColors"]
                        >
                    }
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </MaskedView>
    );
}

Skeleton.Box = React.memo(function Box({
    width = "100%",
    height = 16,
    style,
}: {
    width: DimensionValue;
    height?: DimensionValue;
    style?: ViewStyle;
}) {
    return (
        <View
            style={[
                {
                    width,
                    height,
                    backgroundColor: "black",
                    borderRadius: 8,
                },
                style,
            ]}
        />
    );
});

Skeleton.Circle = React.memo(function Circle({
    size = 50,
    style,
}: {
    size?: number;
    style?: ViewStyle;
}) {
    return (
        <View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: "black",
                },
                style,
            ]}
        />
    );
});

Skeleton.Text = React.memo(function Text({
    lines = 3,
    lineHeight = 14,
    gap = 8,
    lastLineWidth = "60%",
    style,
}: {
    lines?: number;
    lineHeight?: number;
    gap?: number;
    lastLineWidth?: number | string;
    style?: ViewStyle;
}) {
    return (
        <View style={style}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton.Box
                    key={i}
                    height={lineHeight}
                    width={
                        (i === lines - 1 ?
                            lastLineWidth
                        :   "100%") as DimensionValue
                    }
                    style={{
                        marginBottom: i !== lines - 1 ? gap : 0,
                    }}
                />
            ))}
        </View>
    );
});
