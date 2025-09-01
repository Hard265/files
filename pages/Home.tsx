import {
    File,
    Folder,
    GetFolderContentsDocument,
} from "@/graphql/__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { View } from "react-native";
import FolderListToolbar from "@/partials/FolderListToolbar";
import FolderList from "@/partials/FolderList";

export default function HomePage() {
    const { data } = useSuspenseQuery(GetFolderContentsDocument);

    const items = [...data.folders, ...data.files] as (
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
