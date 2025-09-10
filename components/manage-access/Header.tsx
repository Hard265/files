import { Text } from "@/components/ui/text";
import {
    FileFieldsFragment,
    FolderFieldsFragment,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { useSuspenseFragment } from "@apollo/client/react";
import { View } from "react-native";

export type ItemRef = `${"File" | "Folder"}:${string}`;

interface HeaderProps {
    ref: ItemRef;
}

export function Header({ ref }: HeaderProps) {
    const { data } = useSuspenseFragment<
        FolderFieldsFragment | FileFieldsFragment
    >({
        fragment: FolderOrFileFieldsFragmentDoc,
        fragmentName: "FolderOrFileFields",
        from: {
            __ref: ref,
        },
    });

    if (!data?.name) {
        return (
            <View className="items-start p-4 gap-y-2">
                <Text className="text-gray-500">Unknown item</Text>
            </View>
        );
    }

    return (
        <View className="items-start p-4 gap-y-2">
            <Text className="text-lg font-semibold">{data.name}</Text>
        </View>
    );
}
