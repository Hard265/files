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
import { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";

// Type definitions
type ItemType = "File" | "Folder";
type TabType = "people" | "links";
type PermissionRef =
    `${"FolderPermission" | "FilePermission"}:${string}`;
type ItemRef = `${ItemType}:${string}`;

interface HeaderProps {
    ref: ItemRef;
}

interface PermissionProps {
    ref: PermissionRef;
}

// Utility functions
const parseItemRef = (
    ref: string,
): [ItemType | null, string | null] => {
    const parts = ref.split(":");
    if (parts.length !== 2) return [null, null];

    const [type, id] = parts;
    if (type !== "File" && type !== "Folder") return [null, null];

    return [type, id];
};

const isValidPermissionRef = (ref: string): ref is PermissionRef => {
    return (
        ref.startsWith("FolderPermission:")
        || ref.startsWith("FilePermission:")
    );
};

// Components
function Header({ ref }: HeaderProps) {
    const { data } = useSuspenseFragment<
        FolderFieldsFragment | FileFieldsFragment
    >({
        fragment: FolderOrFileFieldsFragmentDoc,
        fragmentName: "FolderOrFileFields",
        from: {
            __ref: ref,
        },
    });

    if (!data?.name) {
        return (
            <View className="p-4 items-start gap-y-2">
                <Text className="text-gray-500">Unknown item</Text>
            </View>
        );
    }

    return (
        <View className="p-4 items-start gap-y-2">
            <Text className="text-lg font-semibold">{data.name}</Text>
        </View>
    );
}

function Permission({ ref }: PermissionProps) {
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
        <View className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg">
            <View className="flex-1">
                <Text className="font-medium">{data.userId}</Text>
                <Text className="text-sm text-gray-600 capitalize">
                    {data.role}
                </Text>
            </View>
            <Button variant="ghost" size="sm">
                <Icon name="more_horiz" size={20} />
            </Button>
        </View>
    );
}

function EmptyState({
    onStartSharing,
}: {
    onStartSharing: () => void;
}) {
    return (
        <View className="items-center py-8 gap-y-4">
            <Icon name="group" size={48} className="text-gray-300" />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No one has access yet
                </Text>
                <Text className="text-gray-600 text-center">
                    Share this item to collaborate with others
                </Text>
            </View>
            <Button variant="default" onPress={onStartSharing}>
                <Icon name="add_circle_line" size={20} />
                <Text className="ml-2">Start sharing</Text>
            </Button>
        </View>
    );
}

function PeopleTab({
    permissions,
    onStartSharing,
}: {
    permissions: (
        | FolderPermissionFieldsFragment
        | FilePermissionFieldsFragment
    )[];
    onStartSharing: () => void;
}) {
    if (permissions.length === 0) {
        return <EmptyState onStartSharing={onStartSharing} />;
    }

    return (
        <View className="gap-y-3">
            <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">
                    People ({permissions.length})
                </Text>
                <Button
                    variant="outline"
                    size="sm"
                    onPress={onStartSharing}
                >
                    <Icon name="add" size={16} />
                    <Text className="ml-1">Add</Text>
                </Button>
            </View>
            {permissions.map((permission) => (
                <Permission
                    key={permission.id}
                    ref={
                        `${permission.__typename}:${permission.id}` as PermissionRef
                    }
                />
            ))}
        </View>
    );
}

function LinksTab() {
    return (
        <View className="items-center py-8 gap-y-4">
            <Icon name="link" size={48} className="text-gray-300" />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No shared links
                </Text>
                <Text className="text-gray-600 text-center">
                    Create shareable links for easy access
                </Text>
            </View>
            <Button variant="outline">
                <Icon name="add" size={20} />
                <Text className="ml-2">Create link</Text>
            </Button>
        </View>
    );
}

export default function ManageAccessPage({
    route,
    navigation,
}: NativeStackScreenProps<RootStackParamsList, "ManageAccess">) {
    const [type, id] = parseItemRef(route.params.ref);
    const tab = (route.params.tab ?? "people") as TabType;

    // Validate params
    if (!type || !id) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-600">
                    Invalid item reference
                </Text>
            </View>
        );
    }

    const { data, error } = useSuspenseQuery(
        ItemAccessDetailsDocument,
        {
            variables: {
                id,
                isFolder: type === "Folder",
                isFile: type === "File",
            },
            errorPolicy: "all",
        },
    );

    // Handle query errors
    if (error && !data) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-600">
                    Failed to load access details
                </Text>
                <Button
                    variant="outline"
                    onPress={() => navigation.goBack()}
                    className="mt-4"
                >
                    <Text>Go back</Text>
                </Button>
            </View>
        );
    }

    const permissions = useMemo(
        () =>
            [
                ...(data.filePermissionsByFileId ?? []),
                ...(data.folderPermissionsByFolderId ?? []),
            ] as (
                | FolderPermissionFieldsFragment
                | FilePermissionFieldsFragment
            )[],
        [
            data.filePermissionsByFileId,
            data.folderPermissionsByFolderId,
        ],
    );

    const onSwitchTab = useCallback(
        (newTab: string) => {
            if (newTab === "people" || newTab === "links") {
                navigation.setParams({
                    ...route.params,
                    tab: newTab as TabType,
                });
            }
        },
        [navigation, route.params],
    );

    const onStartSharing = useCallback(() => {
        // TODO: Implement sharing logic
        console.log("Start sharing clicked");
    }, []);

    return (
        <ScrollView className="flex-1 bg-white">
            <Header ref={route.params.ref} />

            <View className="p-4">
                <Tabs
                    value={tab}
                    onValueChange={onSwitchTab}
                    className="w-full"
                >
                    <TabsList className="w-full">
                        <TabsTrigger
                            value="people"
                            className="flex-1"
                        >
                            <Text>People</Text>
                        </TabsTrigger>
                        <TabsTrigger value="links" className="flex-1">
                            <Text>Links</Text>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="people" className="mt-6">
                        <PeopleTab
                            permissions={permissions}
                            onStartSharing={onStartSharing}
                        />
                    </TabsContent>

                    <TabsContent value="links" className="mt-6">
                        <LinksTab />
                    </TabsContent>
                </Tabs>
            </View>
        </ScrollView>
    );
}
