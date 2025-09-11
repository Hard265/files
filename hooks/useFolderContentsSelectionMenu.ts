import Icon from "@/components/Icon";
import { useFolderOpsContext } from "@/providers/FolderOpsProvider";
import { useUI } from "@/providers/UIProvider";
import { RootStackParamsList } from "@/Router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentProps, useCallback, useMemo } from "react";

export type MenuItemConfig = {
    id: string;
    label: string;
    icon: ComponentProps<typeof Icon>["name"];
    action:
        | "share"
        | "manageAccess"
        | "star"
        | "offline"
        | "copyLink"
        | "makeCopy"
        | "sendCopy"
        | "download"
        | "rename"
        | "move"
        | "delete"
        | "report"
        | "info";
    display: "always" | "single";
};

type ActionHandlerMap = Record<
    MenuItemConfig["action"],
    (items: __ref[]) => void
>;

export default function useFolderContentsSelectionMenu() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const { openDialog } = useUI();
    const folderOps = useFolderOpsContext();

    /**
     * Maps each action to a specific handler function.
     */
    const actionHandlers: ActionHandlerMap = useMemo(
        () => ({
            manageAccess: (items) => {
                if (items.length > 0) {
                    navigation.navigate("ManageAccess", {
                        ref: items[0],
                    });
                }
            },
            delete: (items) => {
                openDialog({
                    title: "Confirm Deletion",
                    message: `Are you sure you want to delete ${items.length} item(s)?. This action cannot be undone.`,
                    cancelText: "Cancel",
                    confirmText: "Delete",
                    onConfirm: () => {
                        folderOps.delete(items);
                    },
                });
            },
            share: (items) => {
                if (items.length > 0) {
                    navigation.navigate("Share", {
                        refs: items,
                    });
                }
            },
            star: (items) => {
                folderOps.star(items, true);
            },
            offline: (items) => {
                console.log("Making items available offline:", items);
            },
            copyLink: (items) => {
                console.log("Copying link for items:", items);
            },
            makeCopy: (items) => {
                console.log("Making a copy of items:", items);
            },
            sendCopy: (items) => {
                console.log("Sending a copy of items:", items);
            },
            download: (items) => {
                console.log("Downloading items:", items);
            },
            rename: (items) => {
                console.log("Renaming items:", items);
            },
            move: (items) => {
                console.log("Moving items:", items);
            },
            report: (items) => {
                console.log("Reporting items:", items);
            },
            info: (items) => {
                console.log("Showing info for items:", items);
            },
        }),
        [folderOps, navigation, openDialog],
    );

    /**
     * The main handler function that dispatches the action.
     * It looks up the correct handler from the action map and executes it.
     */
    const handler = useCallback(
        (action: MenuItemConfig["action"], items: __ref[]) => {
            const handleAction = actionHandlers[action];
            if (handleAction) {
                handleAction(items);
            } else {
                console.warn(
                    `No handler found for action: ${action}`,
                );
            }
        },
        [actionHandlers],
    );

    return {
        onActionHandler: handler,
    };
}

/**
 * Defines the complete menu configuration.
 */
export const menuConfig: MenuItemConfig[][] = [
    [
        {
            id: "share",
            label: "Share",
            icon: "user_add_2_line",
            action: "share",
            display: "always",
        },
        {
            id: "manage-access",
            label: "Manage access",
            icon: "group_2_line",
            action: "manageAccess",
            display: "single",
        },
        {
            id: "star",
            label: "Add to starred",
            icon: "star_line",
            action: "star",
            display: "always",
        },
        {
            id: "offline",
            label: "Make available offline",
            icon: "wifi_off_line",
            action: "offline",
            display: "always",
        },
    ],
    [
        {
            id: "copy-link",
            label: "Copy link",
            icon: "link_2_line",
            action: "copyLink",
            display: "single",
        },
        {
            id: "make-copy",
            label: "Make a copy",
            icon: "copy_2_line",
            action: "makeCopy",
            display: "always",
        },
        {
            id: "send-copy",
            label: "Send a copy",
            icon: "forward_2_line",
            action: "sendCopy",
            display: "always",
        },
    ],
    [
        {
            id: "download",
            label: "Download",
            icon: "download_2_line",
            action: "download",
            display: "always",
        },
        {
            id: "rename",
            label: "Rename",
            icon: "edit_2_line",
            action: "rename",
            display: "single",
        },
        {
            id: "move",
            label: "Move",
            icon: "file_export_line",
            action: "move",
            display: "always",
        },
        {
            id: "delete",
            label: "Delete",
            icon: "delete_3_line",
            action: "delete",
            display: "always",
        },
    ],
    [
        {
            id: "report",
            label: "Report",
            icon: "flag_1_line",
            action: "report",
            display: "always",
        },
        {
            id: "info",
            label: "Info and activities",
            icon: "information_line",
            action: "info",
            display: "single",
        },
    ],
];
