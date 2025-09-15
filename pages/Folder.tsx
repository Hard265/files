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
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { Suspense, useCallback } from "react";
import { View } from "react-native";
import { Subject } from "rxjs";

export const infolderSubject = new Subject<"GO_BACK">();
const infolderSubject$ = infolderSubject.asObservable();

function FolderPage({
    route,
    navigation,
}: NativeStackScreenProps<RootStackParamsList, "Folder">) {
    useSuspenseQuery<GetFolderQuery>(GetFolderDocument, {
        variables: {
            id: route.params.id,
        },
    });
    const { id } = useFolderPage(route.params.id);

    useFocusEffect(
        useCallback(() => {
            const subscriber = infolderSubject$.subscribe((payload) => {
                if (payload === "GO_BACK") {
                    navigation.goBack();
                }
            });
            return () => {
                subscriber.unsubscribe();
            };
        }, [navigation]),
    );

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
                    <FolderContents navigation={navigation} route={route}/>
                </Suspense>
            </View>
        </FolderOpsProvider>
    );
}

export default observer(FolderPage);
