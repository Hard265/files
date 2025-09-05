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
import { getGravatarUrl } from "@/utils";
import { Avatar } from "@/components";
import _ from "lodash";
import { PixelRatio } from "react-native";

const getUrlMemoized = _.memoize(getGravatarUrl);

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

    const avatarSize = useMemo(
        () => PixelRatio.getPixelSizeForLayoutSize(18),
        [],
    );

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                title: id !== null ? data?.name : "",
                headerLeft:
                    id !== null ? undefined : (
                        async () => {
                            if (!store.auth.user) return;
                            const url = await getUrlMemoized(
                                store.auth.user.email,
                            );
                            return (
                                <Avatar
                                    source={{ uri: url }}
                                    size={avatarSize}
                                />
                            );
                        }
                    ),
                headerRight: ({ tintColor }) => (
                    <FolderPageHeaderRight tintColor={tintColor} />
                ),
            });
        }, [navigation, id, data?.name, avatarSize]),
    );
}
