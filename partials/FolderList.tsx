import { File, Folder } from "@/graphql/__generated__/graphql";
import { FlashList } from "@shopify/flash-list";
import { Suspense, useCallback } from "react";
import FolderListItem from "@/partials/FolderListItem";
import { Text } from "@/components/Text";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "@/Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface FolderListProps {
    items: (File | Folder)[];
}

function FolderList({ items }: FolderListProps) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();

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
    return (
        <FlashList
            data={items}
            renderItem={render}
            keyExtractor={(item) => item.id}
        />
    );
}

export default FolderList;
