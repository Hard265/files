import { useTheme } from "@react-navigation/native";
import { Text } from "./ui/text";
import { IconButton } from "./Button";
import Icon from "./Icon";
import { View, ActivityIndicator, Pressable } from "react-native";
import {
    memo,
    Suspense,
    useState,
    ComponentProps,
    useMemo,
} from "react";
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
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";
import useFolderContentsSelectionMenu, {
    menuConfig,
    MenuItemConfig,
} from "@/hooks/useFolderContentsSelectionMenu";
import {FolderOrFileFieldsFragmentDoc} from "@/graphql/__generated__/graphql";

interface ItemsMenuProps {
    refs: __ref[];
    onAction?: (
        action: MenuItemConfig["action"],
        refs: ItemsMenuProps["refs"],
    ) => void;
}

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
            <Pressable onPress={onPress}>
                <Icon name={icon} size={20} color={colors.text} />
                <Text>{label}</Text>
            </Pressable>
        </DropdownMenuItem>
    );
});

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

export const ItemsMenu = memo(function ItemsMenu(
    props: Omit<ItemsMenuProps, "onAction">,
) {
    const [shown, setShown] = useState(false);
    const { onActionHandler } = useFolderContentsSelectionMenu();
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 4,
        right: 4,
    };
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
                            onAction={onActionHandler}
                        />
                    )}
                </Suspense>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
