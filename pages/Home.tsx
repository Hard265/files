import {
    File,
    Folder,
    GetFolderContentsDocument,
} from "@/graphql/__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { View } from "react-native";
import FolderList from "@/partials/FolderList";
import useFolderPage from "@/hooks/useFolderPage";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import FolderListHeader from "@/partials/FolderListHeader";
import { observer } from "mobx-react-lite";

function HomePage() {
    const { headerStyle } = useHeaderScroll();
    const { data } = useSuspenseQuery(GetFolderContentsDocument);

    const items = [...data.folders, ...data.files] as (
        | File
        | Folder
    )[];

    useFolderPage(null);
    return (
        <View className="flex-1">
            <FolderListHeader />
            <FolderList items={items} />
        </View>
    );
}

export default observer(HomePage);
