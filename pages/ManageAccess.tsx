import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import {
    FileFieldsFragment,
    FilePermissionFieldsFragment,
    FilePermissionFieldsFragmentDoc,
    FolderFieldsFragment,
    FolderOrFileFieldsFragmentDoc,
    FolderPermissionFieldsFragment,
    FolderPermissionFieldsFragmentDoc,
    ItemAccessDetailsDocument,
} from "@/graphql/__generated__/graphql";
import { RootStackParamsList } from "@/Router";
import {
    useSuspenseFragment,
    useSuspenseQuery,
} from "@apollo/client/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
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

function Permission({
    ref,
}: {
    ref: `${"FolderPermission" | "FilePermission" | undefined}:${string}`;
}) {
    const isFolderPermission = useMemo(
        () => ref.startsWith("FolderPermission:"),
        [ref],
    );
    const { data } = useSuspenseFragment<
        FolderPermissionFieldsFragment | FilePermissionFieldsFragment
    >({
        fragment:
            isFolderPermission ?
                FolderPermissionFieldsFragmentDoc
            :   FilePermissionFieldsFragmentDoc,
        fragmentName:
            isFolderPermission ?
                "FolderPermissionFields"
            :   "FilePermissionFields",
        from: {
            __ref: ref,
        },
    });
    return (
        <View className="flex-row gap-x-4">
            <Text>{data.userId}</Text>
            <Text>{data.role}</Text>
        </View>
    );
}

export default function ManageAccessPage({
    route,
    navigation,
}: NativeStackScreenProps<RootStackParamsList, "ManageAccess">) {
    const [type, id = null] = route.params.ref.split(":");
    const tab = useMemo(() => route.params.tab ?? "people", []);
    const { data } = useSuspenseQuery(ItemAccessDetailsDocument, {
        variables: {
            id,
            isFolder: type === "Folder",
            isFile: type === "File",
        },
    });
    const permissions = useMemo(
        () =>
            [
                ...(data.filePermissionsByFileId ?? []),
                ...(data.folderPermissionsByFolderId ?? []),
            ] as (
                | FolderPermissionFieldsFragment
                | FilePermissionFieldsFragment
            )[],
        [],
    );
    const onSwitchTab = (
        tab: NonNullable<typeof route.params.tab>,
    ) => {
        navigation.setParams({ ...route.params, tab });
    };

    return (
        <ScrollView>
            <Header ref={route.params.ref} />
            <View className="p-4 gap-y-2">
                <Tabs
                    value={tab}
                    onValueChange={
                        onSwitchTab as (value: string) => void
                    }
                    className="sm:w-[400px]"
                >
                    <TabsList>
                        <TabsTrigger value="people">
                            <Text>People 1</Text>
                        </TabsTrigger>
                        <TabsTrigger value="links">
                            <Text>Links</Text>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="people">
                        {permissions.map((permission) => (
                            <Permission
                                key={permission.id}
                                ref={`${permission.__typename}:${permission.id}`}
                            />
                        ))}
                    </TabsContent>
                    <TabsContent value="links">
                        <Text>Change your password here.</Text>
                    </TabsContent>
                </Tabs>

                <Text>
                    This file has not been shared with anyone yet.
                </Text>
                <Button variant="link" className="px-0 self-start">
                    <Icon name="add_circle_line" size={22} />
                    <Text className="text-base">Start sharing</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
