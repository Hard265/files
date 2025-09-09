import Animated from "react-native-reanimated";
import { useSuspenseFragment } from "@apollo/client/react";
import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "@/Router";
import FolderListToolbar from "@/partials/FolderListToolbar";

export function FolderContentsHeader() {
    const route =
        useRoute<RouteProp<RootStackParamsList, "Folder">>();
    const id = route.params?.id ?? null;
    const { data } = useSuspenseFragment({
        fragment: FolderFieldsFragmentDoc,
        from: {
            __ref: `Folder:${id}`,
        },
    });

    return (
        <Animated.View>
            <View className="p-4">
                <Text variant="h1" className="text-start">
                    {data.name}
                </Text>
            </View>
            <FolderListToolbar />
        </Animated.View>
    );
}
