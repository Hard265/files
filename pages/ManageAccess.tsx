import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
    FileFieldsFragment,
    FolderFieldsFragment,
    FolderOrFileFieldsFragmentDoc,
    GetFileDocument,
    GetFolderDocument,
} from "@/graphql/__generated__/graphql";
import { RootStackParamsList } from "@/Router";
import {
    skipToken,
    useSuspenseFragment,
    useSuspenseQuery,
} from "@apollo/client/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";

function Header({ ref }: { ref: __ref }) {
    const { data } = useSuspenseFragment<
        FolderFieldsFragment | FileFieldsFragment
    >({
        fragment: FolderOrFileFieldsFragmentDoc,
        fragmentName: "FolderOrFileFields",
        from: {
            __ref: ref,
        },
    });
    return (
        <View className="p-4 items-start gap-y-2">
            <Text>{data?.name}</Text>
        </View>
    );
}

function AccessTabs() {
    return (
        <View className="p-4 items-start gap-y-2">
            <
            <Text>
                This file has not been shared with anyone yet.
            </Text>
            <Button variant="link" className="px-0">
                <Icon name="add_circle_line" size={22} />
                <Text className="text-base">Start sharing</Text>
            </Button>
        </View>
    );
}

export default function ManageAccessPage({
    route,
}: NativeStackScreenProps<RootStackParamsList, "ManageAccess">) {
    const [type, id = null] = route.params.ref.split(":");
    var folderQuery = useSuspenseQuery(
        GetFolderDocument,
        type === "Folder" ?
            {
                variables: { id },
            }
        :   skipToken,
    );
    const fileQuery = useSuspenseQuery(
        GetFileDocument,
        type === "File" ?
            {
                variables: { id },
            }
        :   skipToken,
    );

    const { data } = type === "Folder" ? folderQuery : fileQuery;

    return (
        <ScrollView>
            <Header ref={route.params.ref} />
            <AccessTabs />
        </ScrollView>
    );
}
