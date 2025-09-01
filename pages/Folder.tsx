import {
    Folder,
    File,
    GetFolderContentsDocument,
    GetFolderDocument,
    GetFolderQuery,
} from "@/graphql/__generated__/graphql";
import FolderList from "@/partials/FolderList";
import FolderListToolbar from "@/partials/FolderListToolbar";
import { RootStackParamsList } from "@/Router";
import { useSuspenseQuery } from "@apollo/client/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

export default function FolderPage({
    route,
}: NativeStackScreenProps<RootStackParamsList, "Folder">) {
    const { data } = useSuspenseQuery<GetFolderQuery>(
        GetFolderDocument,
        {
            variables: {
                id: route.params.id,
            },
        },
    );

    const { data: contents } = useSuspenseQuery(
        GetFolderContentsDocument,
        {
            variables: {
                folderId: route.params.id,
            },
        },
    );

    const items = [...contents.folders, ...contents.files] as (
        | File
        | Folder
    )[];

    return (
        <View className="flex-1">
            <FolderListToolbar />
            <FolderList items={items} />
        </View>
    );
}
