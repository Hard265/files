import { View } from "react-native";
import FolderListToolbar from "./FolderListToolbar";
import { useSuspenseFragment } from "@apollo/client/react";
import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import { Text } from "@/components/Text";

export default function FolderListHeader({ id }: { id: string }) {
    const { data } = useSuspenseFragment({
        fragment: FolderFieldsFragmentDoc,
        from: {
            __ref: `Folder:${id}`,
        },
    });

    return (
        <View>
            <Text variant="largeTitle">{data.name}</Text>
            <FolderListToolbar />
        </View>
    );
}
