import FolderContents from "@/components/folder-contents";
import { FolderContentsHeader } from "@/components/folder-contents-header";
import { FolderContentsSkeleton } from "@/components/folder-contents-skeleton";
import { Text } from "@/components/ui/text";
import {
    GetFolderDocument,
    GetFolderQuery,
} from "@/graphql/__generated__/graphql";
import useFolderPage from "@/hooks/useFolderPage";
import { FolderOpProvider } from "@/providers/FolderOpProvider";
import { RootStackParamsList } from "@/Router";
import { useSuspenseQuery } from "@apollo/client/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import { View } from "react-native";

function FolderPage({
    route,
}: NativeStackScreenProps<RootStackParamsList, "Folder">) {
    useSuspenseQuery<GetFolderQuery>(GetFolderDocument, {
        variables: {
            id: route.params.id,
        },
    });
    const { ops } = useFolderPage(route.params.id);
    return (
        <FolderOpProvider options={ops}>
            <View className="flex-1">
                <Suspense
                    fallback={
                        <View className="items-center justify-center flex-1">
                            <Text>Loading...</Text>
                        </View>
                    }
                >
                    <FolderContentsHeader />
                </Suspense>
                <Suspense fallback={<FolderContentsSkeleton />}>
                    <FolderContents />
                </Suspense>
            </View>
        </FolderOpProvider>
    );
}

export default observer(FolderPage);
