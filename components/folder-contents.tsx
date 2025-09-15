import {
    File,
    Folder,
    GetFolderContentsDocument,
} from "@/graphql/__generated__/graphql";
import FolderContentsItem from "@/components/folder-contents-item";
import { useSuspenseQuery } from "@apollo/client/react";
import { AnimatedFlashList as FlashList } from "@shopify/flash-list";
import { Suspense, useCallback, useTransition } from "react";
import ErrorBoundary from "./ErrorBoundary";
import {
    RouteProp,
    StackActions,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@/Router";
import { Text } from "./ui/text";
import { RefreshControl, View } from "react-native";
import { FolderContentsItemSkeleton } from "./folder-contents-item-skeleton";
import FolderContentsEmpty from "./folder-contents-empty";
import _ from "lodash";

function FolderContents({ navigation }: any) {
    const route = useRoute<RouteProp<RootStackParamsList, "Folder">>();
    const [isPending, startTransition] = useTransition();
    const { data, refetch } = useSuspenseQuery(GetFolderContentsDocument, {
        variables: {
            folderId: _.defaultTo(route.params?.id, null),
        },
    });
    const items = [...data.folders, ...data.files] as (File | Folder)[];
    const onOpenHandler = useCallback(
        (id: string) => {
            navigation.jumpTo("Folder",  { id });
        },
        [navigation],
    );

    const render = ({ item }: { item: (typeof items)[number] }) => {
        return (
            <ErrorBoundary fallback={<Text>error</Text>}>
                <Suspense fallback={<FolderContentsItemSkeleton />}>
                    <FolderContentsItem
                        id={item.id}
                        type={item.__typename}
                        onOpen={() => onOpenHandler(item.id)}
                    />
                </Suspense>
            </ErrorBoundary>
        );
    };

    const renderRefreshControl = useCallback(
        () => (
            <RefreshControl
                refreshing={isPending}
                onRefresh={() =>
                    startTransition(() => {
                        refetch();
                    })
                }
            />
        ),
        [isPending, refetch],
    );

    return (
        <View className="flex-1">
            <FlashList
                data={items}
                renderItem={render}
                refreshControl={renderRefreshControl()}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<FolderContentsEmpty />}
            />
        </View>
    );
}

export default FolderContents;
