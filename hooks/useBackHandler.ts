import { usePreventRemove } from "@react-navigation/native";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(
    preventDefault: boolean = false,
    callback: () => void = () => {},
) {
    usePreventRemove(preventDefault, callback);
    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                callback();
                return preventDefault;
            },
        );
        return () => {
            subscription.remove();
        };
    }, [callback, preventDefault]);
    return false;
}
