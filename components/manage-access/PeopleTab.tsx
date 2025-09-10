import {
    FilePermissionFieldsFragment,
    FolderPermissionFieldsFragment,
    RoleEnum,
} from "@/graphql/__generated__/graphql";
import { useCallback } from "react";
import { View } from "react-native";
import { EmptyState } from "./EmptyState";
import { Permission, PermissionRef } from "./Permission";

export function PeopleTab({
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
