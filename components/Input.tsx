// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";
import { TextInput, TextInputProps, View } from "react-native";
import { Text } from "./Text";

interface InputProps extends TextInputProps {
    disabled?: boolean;
    errors?: string[];
}

export default function Input({
    errors = [],
    disabled,
    className,
    ...props
}: InputProps) {
    return (
        <View className={clsx("relative gap-y-1")}>
            <TextInput
                {...props}
                className={clsx(
                    className,
                    "relative h-12 px-3 appearance-none rounded-lg",
                    "text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",
                    "border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",
                    "bg-transparent dark:bg-white/5",
                    disabled
                        && "border-zinc-950/20 dark:border-white/15 dark:bg-white/2.5 dark:hover:border-white/15",
                )}
            />
            {errors.map((err, index) => (
                <View key={index}>
                    <Text className="text-red-500 dark:text-red-600" variant="callout">
                        {err}
                    </Text>
                </View>
            ))}
        </View>
    );
}
