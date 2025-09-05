import { useCallback } from "react";
import {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";

export default function useHeaderScroll(
    HEADER_HEIGHT: number = 100,
    options: { snap?: boolean } = {},
) {
    const { snap = false } = options;

    const prevScrollY = useSharedValue(0);
    const offset = useSharedValue(0);

    const applySnap = useCallback(() => {
        const halfway = -HEADER_HEIGHT / 2;
        offset.value = withTiming(
            offset.value < halfway ? -HEADER_HEIGHT : 0,
            {
                duration: 250,
                easing: Easing.out(Easing.cubic),
            },
        );
    }, [HEADER_HEIGHT, offset]);

    const scrollHandler = useAnimatedScrollHandler({
        onEndDrag() {
            if (snap) applySnap();
        },
        onMomentumEnd() {
            if (snap) applySnap();
        },
        onScroll(event) {
            const y = event.contentOffset.y;
            const delta = y - prevScrollY.value;

            offset.value = Math.max(
                Math.min(offset.value - delta, 0),
                -HEADER_HEIGHT,
            );

            prevScrollY.value = y;
        },
    });
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value }],
        };
    });

    return {
        headerScrollHandler: scrollHandler,
        headerStyle: headerAnimatedStyle,
    };
}
