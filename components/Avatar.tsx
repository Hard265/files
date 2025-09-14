import { Image, ImageProps } from "expo-image";
import { cn } from "@/lib/cn";
import { View } from "react-native";

interface AvatarProps {
    source: ImageProps["source"];
    size?: number;
    className?: string;
}

const placeholder = require("../assets/icon.png");

export function Avatar({
    source,
    size = 40,
    className,
}: AvatarProps) {
    return (
        <View
            className={cn(
                "justify-center items-center overflow-hidden rounded-xl",
                className,
            )}
        >
            <Image
                source={source}
                placeholder={placeholder}
                transition={300}
                style={{ width: size, height: size }}
            />
        </View>
    );
}
