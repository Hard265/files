import {
    Folder,
    File,
    GetFolderContentsDocument,
    GetFolderDocument,
    GetFolderQuery,
} from "@/graphql/__generated__/graphql";
import useFolderPage from "@/hooks/useFolderPage";
import FolderList from "@/partials/FolderList";
import FolderListHeader from "@/partials/FolderListHeader";
import { RootStackParamsList } from "@/Router";
import { useSuspenseQuery } from "@apollo/client/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";
import { View } from "react-native";

function FolderPage({
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

    useFolderPage(route.params.id);
    return (
        <View className="flex-1">
            <FolderListHeader id={route.params.id} />
            <FolderList items={items} />
        </View>
    );
}

export default observer(FolderPage);
