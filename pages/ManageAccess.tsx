import Icon from "@/components/Icon";
import { TriggerRef } from "@/components/primitives/select";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { UserAvatar } from "@/components/user-avatar";
import {
    ChangeFilePermissionRoleDocument,
    ChangeFolderPermissionRoleDocument,
    FileFieldsFragment,
    FilePermissionFieldsFragment,
    FilePermissionFieldsFragmentDoc,
    FolderFieldsFragment,
    FolderPermissionFieldsFragment,
    FolderPermissionFieldsFragmentDoc,
    FolderOrFileFieldsFragmentDoc,
    ItemAccessDetailsDocument,
    RoleEnum,
    GetUserDocument,
} from "@/graphql/__generated__/graphql";
import { RootStackParamsList } from "@/Router";
import {
    useMutation,
    useSuspenseFragment,
    useSuspenseQuery,
} from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useCallback, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    onChange: (role: RoleEnum) => void;
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
            <View className="items-start p-4 gap-y-2">
                <Text className="text-gray-500">Unknown item</Text>
            </View>
        );
    }

    return (
        <View className="items-start p-4 gap-y-2">
            <Text className="text-lg font-semibold">{data.name}</Text>
        </View>
    );
}

function Permission({ ref }: PermissionProps) {
    const contentInsets = useSafeAreaInsets();
    const triggerRef = useRef<TriggerRef>(null);
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

    const { data: user } = useSuspenseQuery(GetUserDocument, {
        variables: {
            id: data.userId,
        },
    });

    const [updateFilePermission] = useMutation(
        ChangeFilePermissionRoleDocument,
        {
            optimisticResponse(vars) {
                return {
                    __typename: "Mutation",
                    updateFilePermission: {
                        __typename: "FilePermission",
                        fileId: data.fileId,
                        userId: data.userId,
                        role: vars.role,
                    },
                };
            },
            update(cache, { data }) {
                if (!data?.updateFilePermission) return;
                cache.modify({
                    id: ref,
                    fields: {
                        role() {
                            return data.updateFilePermission.role;
                        },
                    },
                });
            },
        },
    );
    const [updateFolderPermission] = useMutation(
        ChangeFolderPermissionRoleDocument,
        {
            optimisticResponse(vars, { IGNORE }) {
                return {
                    __typename: "Mutation",
                    updateFolderPermission: {
                        __typename: "FolderPermission",
                        folderId: data.folderId,
                        userId: data.userId,
                        role: vars.role,
                    },
                };
            },
            update(cache, { data }) {
                if (!data?.updateFolderPermission) return;
                cache.modify({
                    id: ref,
                    fields: {
                        role() {
                            return data.updateFolderPermission.role;
                        },
                    },
                });
            },
        },
    );

    const onTriggerTouchStart = useCallback(() => {
        triggerRef.current?.open();
    }, [triggerRef]);

    const onRoleChange = useCallback(
        (role: RoleEnum) => {
            if (role === data.role) return;
            else if (data.__typename === "FolderPermission") {
                updateFolderPermission({
                    variables: {
                        id: data.folderId,
                        role,
                    },
                });
            } else if (data.__typename === "FilePermission") {
                updateFilePermission({
                    variables: {
                        id: data.fileId,
                        role,
                    },
                });
            }
        },
        [data, updateFolderPermission, updateFilePermission],
    );

    const roles = [RoleEnum.Owner, RoleEnum.Editor, RoleEnum.Viewer];

    return (
        <View className="flex-row items-center gap-x-2">
            <UserAvatar email={user?.user.email} />
            <View className="flex-1">
                <Text className="font-medium">
                    {user?.user.email}
                </Text>
            </View>
            <Select
                defaultValue={{
                    label: data.role,
                    value: data.role,
                }}
                onValueChange={(option) =>
                    onRoleChange(
                        (option?.value as RoleEnum) || data.role,
                    )
                }
                disabled={data.role === RoleEnum.Owner}
            >
                <SelectTrigger
                    disabled={data.role === RoleEnum.Owner}
                    className="min-w-[120px]"
                    ref={triggerRef}
                    onTouchStart={onTriggerTouchStart}
                >
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent
                    insets={contentInsets}
                    className="w-auto"
                >
                    <SelectGroup>
                        <SelectLabel>Change role</SelectLabel>
                        {roles.map((role) => (
                            <SelectItem
                                key={role}
                                label={role}
                                value={role}
                            >
                                {role}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
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
            <Icon
                name="group_3_line"
                size={48}
                className="text-gray-300"
            />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No one has access yet
                </Text>
                <Text className="text-center text-gray-600">
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
    const changeRoleHandler = useCallback(
        (ref: PermissionRef, role: RoleEnum) => {},
        [],
    );

    if (permissions.length === 0) {
        return <EmptyState onStartSharing={onStartSharing} />;
    }

    return (
        <View className="gap-y-3">
            {permissions.map((permission) => {
                const ref =
                    `${permission.__typename}:${permission.id}` as PermissionRef;
                return (
                    <Permission
                        key={permission.id}
                        ref={ref}
                        onChange={(role) =>
                            changeRoleHandler(ref, role)
                        }
                    />
                );
            })}
        </View>
    );
}

function LinksTab() {
    return (
        <View className="items-center py-8 gap-y-4">
            <Icon
                name="link_line"
                size={48}
                className="text-gray-300"
            />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No shared links
                </Text>
                <Text className="text-center text-gray-600">
                    Create shareable links for easy access
                </Text>
            </View>
            <Button variant="outline">
                <Icon name="add_circle_line" size={20} />
                <Text className="ml-2">Create link</Text>
            </Button>
        </View>
    );
}

export default function ManageAccessPage({
    route,
}: NativeStackScreenProps<RootStackParamsList, "ManageAccess">) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const [type, id] = parseItemRef(route.params.ref);
    const tab = (route.params.tab ?? "people") as TabType;

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

    const permissions = useMemo(
        () =>
            [
                ...(data?.filePermissionsByFileId ?? []),
                ...(data?.folderPermissionsByFolderId ?? []),
            ] as (
                | FolderPermissionFieldsFragment
                | FilePermissionFieldsFragment
            )[],
        [
            data?.filePermissionsByFileId,
            data?.folderPermissionsByFolderId,
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
        <ScrollView className="flex-1">
            <Header ref={route.params.ref} />

            <View className="p-4">
                <Tabs
                    value={tab}
                    onValueChange={onSwitchTab}
                    className="w-full"
                >
                    <TabsList className="w-full bg-transparent">
                        <TabsTrigger
                            value="people"
                            className="flex-1"
                        >
                            <Text>People ({permissions.length})</Text>
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
