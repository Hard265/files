import {
    File,
    Folder,
    GetFolderContentsDocument,
} from "@/graphql/__generated__/graphql";
import FolderListItem from "@/partials/FolderListItem";
import { useSuspenseQuery } from "@apollo/client/react";
import { FlashList } from "@shopify/flash-list";
import { Suspense, useCallback, startTransition } from "react";
import ErrorBoundary from "./ErrorBoundary";
import {
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@/Router";
import { Text } from "./ui/text";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import { RefreshControl, View } from "react-native";
import FolderListHeader from "@/partials/FolderListHeader";

function FolderContents() {
    const route =
        useRoute<RouteProp<RootStackParamsList, "Folder">>();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const { headerScrollHandler: onScroll } = useHeaderScroll();
    const { data, dataState, refetch } = useSuspenseQuery(
        GetFolderContentsDocument,
        {
            variables: {
                folderId: route.params?.id || null,
            },
        },
    );

    const items = [...data.folders, ...data.files] as (
        | File
        | Folder
    )[];
    const onOpenHandler = useCallback(
        (id: string) => {
            navigation.push("Folder", {
                id,
            });
        },
        [navigation],
    );

    const render = ({ item }: { item: (typeof items)[number] }) => {
        return (
            <ErrorBoundary fallback={<Text>error</Text>}>
                <Suspense fallback={<Text>Loading...</Text>}>
                    <FolderListItem
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
                refreshing={dataState === "streaming"}
                onRefresh={() =>
                    startTransition(() => {
                        refetch();
                    })
                }
            />
        ),
        [dataState, refetch],
    );

    return (
        <View className="flex-1">
            <FlashList
                data={items}
                renderItem={render}
                refreshControl={renderRefreshControl()}
                estimatedItemSize={50}
                onScroll={onScroll}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default FolderContents;
