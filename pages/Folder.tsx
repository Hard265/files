import FolderContents from "@/components/folder-contents";
import { FolderContentsHeader } from "@/components/folder-contents-header";
import { FolderContentsSkeleton } from "@/components/folder-contents-skeleton";
import { Text } from "@/components/ui/text";
import {
    GetFolderDocument,
    GetFolderQuery,
} from "@/graphql/__generated__/graphql";
import useBackHandler from "@/hooks/useBackHandler";
import useFolderPage from "@/hooks/useFolderPage";
import FolderOpsProvider from "@/providers/FolderOpsProvider";
import { RootStackParamsList } from "@/Router";
import { useSuspenseQuery } from "@apollo/client/react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Suspense, useCallback, useEffect } from "react";
import { View } from "react-native";

const history: string[] = [];

function FolderPage({
    route,
    navigation,
}: DrawerScreenProps<RootStackParamsList, "Folder">) {
    useSuspenseQuery<GetFolderQuery>(GetFolderDocument, {
        variables: {
            id: route.params.id,
        },
    });
    const { id } = useFolderPage(route.params.id);

    useEffect(() => {
        if (!history.includes(id!)) {
            history.push(id!);
        }
    }, [id]);

    useBackHandler(history.length > 1, () => {
        let to = _.last(history);
        if (to) {
            navigation.jumpTo("Folder", { id: to });
        }
        history.pop();
    });

    return (
        <FolderOpsProvider id={id}>
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
                    <FolderContents navigation={navigation} />
                </Suspense>
            </View>
        </FolderOpsProvider>
    );
}

export default observer(FolderPage);
