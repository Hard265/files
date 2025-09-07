import FolderContents from "@/components/folder-contents";
import { FolderContentsSkeleton } from "@/components/folder-contents-skeleton";
import { Text } from "@/components/ui/text";
import {
    GetFolderDocument,
    GetFolderQuery,
} from "@/graphql/__generated__/graphql";
import useFolderPage from "@/hooks/useFolderPage";
import FolderListHeader from "@/partials/FolderListHeader";
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
    useFolderPage(route.params.id);
    return (
        <View className="flex-1">
            <Suspense
                fallback={
                    <View className="items-center justify-center flex-1">
                        <Text>Loading...</Text>
                    </View>
                }
            >
                <FolderListHeader />
            </Suspense>
            <Suspense fallback={<FolderContentsSkeleton />}>
                <FolderContents />
            </Suspense>
        </View>
    );
}

export default observer(FolderPage);
