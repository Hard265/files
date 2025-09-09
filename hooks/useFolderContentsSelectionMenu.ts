import Icon from "@/components/Icon";
import { RootStackParamsList } from "@/Router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentProps } from "react";

export default function useFolderContentsSelectionMenu() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();

    const handler = (
        action: MenuItemConfig["action"],
        items: __ref[],
    ) => {
        // Handle the action with the selected items
        switch (action) {
            case "manageAccess":
                navigation.navigate("ManageAccess", {
                    ref: items[0],
                });
                break;
            case "delete":
                // Delete the selected items
                break;
            // Add more cases as needed
        }
    };
    return {
        onActionHandler: handler,
    };
}

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
