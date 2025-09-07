import Animated from "react-native-reanimated";
import FolderListToolbar from "./FolderListToolbar";
import { useSuspenseFragment } from "@apollo/client/react";
import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function FolderListHeader({
    id = null,
}: {
    id?: string | null;
}) {
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
