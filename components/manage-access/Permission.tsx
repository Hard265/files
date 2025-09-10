import { TriggerRef } from "@/components/primitives/select";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { UserAvatar } from "@/components/user-avatar";
import {
    ChangeFilePermissionRoleDocument,
    ChangeFolderPermissionRoleDocument,
    FilePermissionFieldsFragment,
    FilePermissionFieldsFragmentDoc,
    FolderPermissionFieldsFragment,
    FolderPermissionFieldsFragmentDoc,
    GetUserDocument,
    RoleEnum,
    UserFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { useFragment, useMutation, useSuspenseQuery } from "@apollo/client/react";
import { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type PermissionRef =
    `${"FolderPermission" | "FilePermission"}:${string}`;

interface PermissionProps {
    ref: PermissionRef;
    onChange: (role: RoleEnum) => void;
}

export function Permission({ ref }: PermissionProps) {
    const contentInsets = useSafeAreaInsets();
    const triggerRef = useRef<TriggerRef>(null);
    const isFolderPermission = useMemo(
        () => ref.startsWith("FolderPermission:"),
        [ref],
    );

    const { data } = useFragment<
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

    const { data: userData } = useSuspenseQuery(GetUserDocument, {
        variables: {
            id: data.userId,
        },
    });

    const { data: user } = useFragment({
        fragment: UserFieldsFragmentDoc,
        fragmentName: "UserFields",
        from: userData.user,
    });

    const [updateFilePermission] = useMutation(
        ChangeFilePermissionRoleDocument,
        {
            optimisticResponse(vars) {
                if (data.__typename !== "FilePermission") {
                    // This should not happen
                    return {
                        __typename: "Mutation" as const,
                        updateFilePermission: {
                            __typename: "FilePermission" as const,
                            id: "temp",
                            fileId: "temp",
                            userId: "temp",
                            role: vars.role,
                        },
                    };
                }
                return {
                    __typename: "Mutation" as const,
                    updateFilePermission: {
                        __typename: "FilePermission" as const,
                        id: data.id,
                        fileId: data.fileId,
                        userId: data.userId,
                        role: vars.role,
                    },
                };
            },
            update(cache, { data: mutationData }) {
                if (!mutationData?.updateFilePermission) return;
                cache.modify({
                    id: ref,
                    fields: {
                        role() {
                            return mutationData.updateFilePermission.role;
                        },
                    },
                });
            },
        },
    );
    const [updateFolderPermission] = useMutation(
        ChangeFolderPermissionRoleDocument,
        {
            optimisticResponse(vars) {
                if (data.__typename !== "FolderPermission") {
                    // This should not happen
                    return {
                        __typename: "Mutation" as const,
                        updateFolderPermission: {
                            __typename: "FolderPermission" as const,
                            id: "temp",
                            folderId: "temp",
                            userId: "temp",
                            role: vars.role,
                        },
                    };
                }
                return {
                    __typename: "Mutation" as const,
                    updateFolderPermission: {
                        __typename: "FolderPermission" as const,
                        id: data.id,
                        folderId: data.folderId,
                        userId: data.userId,
                        role: vars.role,
                    },
                };
            },
            update(cache, { data: mutationData }) {
                if (!mutationData?.updateFolderPermission) return;
                cache.modify({
                    id: ref,
                    fields: {
                        role() {
                            return (
                                mutationData.updateFolderPermission?.role
                                ?? null
                            );
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
                        id: data.id,
                        role,
                    },
                });
            } else if (data.__typename === "FilePermission") {
                updateFilePermission({
                    variables: {
                        id: data.id,
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
            <UserAvatar email={user?.email} />
            <View className="flex-1">
                <Text className="font-medium">
                    {user?.email}
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
