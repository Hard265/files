import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import { RootStackParamsList } from "@/Router";
import { useSuspenseFragment } from "@apollo/client/react";
import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo } from "react";
import store from "@/stores";
import useBackHandler from "./useBackHandler";
import { UserMenu } from "@/components/user-menu";
import FolderHeaderRight from "@/components/folder-header-right";
import { FolderTitle } from "@/components/folder-title";

export default function useFolderPage(id: string | null = null) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const { data } = useSuspenseFragment({
        fragment: FolderFieldsFragmentDoc,
        from: {
            __ref: `Folder:${id}`,
        },
    });

    const title = useMemo(
        () => (id !== null ? data?.name : ""),
        [data?.name, id],
    );

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                title,
                headerTitle: (props) => <FolderTitle {...props} />,
                headerLeft:
                    id !== null ? undefined : () => <UserMenu />,
                headerRight: ({ tintColor }) => (
                    <FolderHeaderRight tintColor={tintColor} />
                ),
            });
        }, [navigation, title, id]),
    );
    useBackHandler(store.ui.selectionCount > 0, () => {
        store.ui.clearSelection();
    });

    return {
        id,
    };
}
