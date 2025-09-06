import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import FolderPageHeaderRight from "@/partials/FolderPageHeaderRight";
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
                /*headerTitle({ children }) {
                    return (
                        <View>
                            <Animated.Text>{children}</Animated.Text>
                        </View>
                    );
                },*/
                headerLeft:
                    id !== null ? undefined : () => <UserMenu />,
                headerRight: ({ tintColor }) => (
                    <FolderPageHeaderRight tintColor={tintColor} />
                ),
            });
        }, [navigation, title, id]),
    );
    useBackHandler(store.ui.selectionCount > 0, () => {
        store.ui.clearSelection();
    });
}
