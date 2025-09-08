import { useTheme } from "@react-navigation/native";
import { Text } from "./ui/text";
import { IconButton } from "./Button";
import Icon from "./Icon";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
    memo,
    Suspense,
    useState,
    ComponentProps,
    useMemo,
} from "react";
import { Separator } from "./ui/separator";
import {
    File,
    Folder,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { useSuspenseFragment } from "@apollo/client/react";
import { formatBytesIEC } from "@/utils";
import dayjs from "dayjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";

interface ItemsMenuProps {
    refs: `${NonNullable<(Folder | File)["__typename"]>}:${string}`[];
    onAction?: (action: string, refs: ItemsMenuProps["refs"]) => void;
}

type MenuItemConfig = {
    id: string;
    label: string;
    icon: ComponentProps<typeof Icon>["name"];
    action: string;
    display: "always" | "single";
};

// --- Reusable MenuItem Component ---
const MenuItem = memo(function MenuItem({
    label,
    icon,
    onPress,
}: {
    label: string;
    icon: ComponentProps<typeof Icon>["name"];
    onPress: () => void;
}) {
    const { colors } = useTheme();
    return (
        <DropdownMenuItem asChild>
            <View>
                <Icon name={icon} size={20} color={colors.text} />
                <Text>{label}</Text>
            </View>
        </DropdownMenuItem>
    );
});

// --- Menu Configuration Array ---
const menuConfig: MenuItemConfig[][] = [
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

// --- Improved Options Component ---
const Options = memo(function Options({
    refs,
    onAction,
}: ItemsMenuProps) {
    const { data } = useSuspenseFragment({
        fragment: FolderOrFileFieldsFragmentDoc,
        fragmentName: "FolderOrFileFields",
        from: { __ref: refs[0] },
    }) as any;

    const count = refs.length;
    const isMultiple = count > 1;

    // Determine which menu items to render based on selection count.
    const visibleItems = useMemo(
        () =>
            !isMultiple ? menuConfig : (
                _.map(menuConfig, (group) =>
                    _.reject(group, {
                        display: "single",
                    }),
                )
            ),
        [isMultiple],
    );

    return (
        <>
            <DropdownMenuLabel>
                {isMultiple ? `${count} selected` : data?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {visibleItems.map((group, index) => (
                <>
                    <DropdownMenuGroup key={index}>
                        {group.map((item) => (
                            <MenuItem
                                key={item.id}
                                label={item.label}
                                icon={item.icon}
                                onPress={() =>
                                    onAction?.(item.action, refs)
                                }
                            />
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </>
            ))}
            {!isMultiple && data && (
                <>
                    <View className="flex-col p-2 gap-y-1">
                        <Text variant="muted">
                            Created at:{" "}
                            {dayjs(data.createdAt).format(
                                "DD MMM YYYY HH:mm",
                            )}
                        </Text>
                        {data.__typename === "File" && (
                            <Text variant="muted">
                                Size: {formatBytesIEC(data.size)}
                            </Text>
                        )}
                    </View>
                </>
            )}
        </>
    );
});

// --- Suspense Fallback Component ---
const LoadingState = () => (
    <View className="items-center justify-center w-40 h-40">
        <ActivityIndicator />
    </View>
);

export function ItemsMenu(props: ItemsMenuProps) {
    const [shown, setShown] = useState(false);
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 4,
        right: 4,
    };
    // Avoid rendering the popover content unless it's needed.
    const shouldRenderContent = props.refs.length > 0 && shown;

    return (
        <DropdownMenu onOpenChange={setShown}>
            <DropdownMenuTrigger>
                <IconButton name="more_2_fill" size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                insets={contentInsets}
                side="bottom"
                className="w-auto"
                align="end"
            >
                <Suspense fallback={<LoadingState />}>
                    {shouldRenderContent && (
                        <Options
                            refs={props.refs}
                            onAction={props.onAction}
                        />
                    )}
                </Suspense>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
