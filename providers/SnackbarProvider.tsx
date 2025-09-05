import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { Text } from "react-native";
import Animated, {
    SlideInUp,
    SlideOutDown,
} from "react-native-reanimated";

type SnackbarContextType = {
    showSnackbar: (message: string, duration?: number) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
    showSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [message, setMessage] = useState<string | null>(null);

    const showSnackbar = (msg: string, duration = 2000) => {
        setMessage(msg);

        // auto dismiss
        setTimeout(() => setMessage(null), duration);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {message && (
                <Animated.View
                    entering={SlideInUp.springify().damping(15)}
                    exiting={SlideOutDown.duration(250)}
                    className="absolute p-4 bg-gray-800 shadow-lg bottom-4 left-4 right-4 rounded-md"
                >
                    <Text className="text-center text-white">
                        {message}
                    </Text>
                </Animated.View>
            )}
        </SnackbarContext.Provider>
    );
};
