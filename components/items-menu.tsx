import { useTheme } from "@react-navigation/native";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { Text } from "./ui/text";
import { IconButton } from "./Button";
import { Button } from "./ui/button";
import Icon from "./Icon";
import { Pressable, View } from "react-native";
import { ComponentProps } from "react";
import { Separator } from "./ui/separator";
import {
    File,
    Folder,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { useSuspenseFragment } from "@apollo/client/react";

interface IItemMenuProps {
    refs: `${NonNullable<(Folder | File)["__typename"]>}:${string}`[];
}

export function ItemsMenu(props: IItemMenuProps) {
    const { colors } = useTheme();
    const { data } = useSuspenseFragment({
        fragment: FolderOrFileFieldsFragmentDoc,
        fragmentName: "FolderOrFileFields",
        from: {
            __ref: props.refs[0],
        },
    });
    const count = props.refs.length;
    const items: ({
        name: string;
        icon: ComponentProps<typeof Icon>["name"];
    } | null)[] = [
        {
            name: "Share",
            icon: "user_add_2_line",
        },
        {
            name: "Manage access",
            icon: "group_2_line",
        },
        {
            name: "Add to starred",
            icon: "star_line",
        },
        {
            name: "Make available offline",
            icon: "wifi_off_line",
        },
        null,
        {
            name: "Copy link",
            icon: "link_2_line",
        },
        {
            name: "Send a copy",
            icon: "forward_line",
        },
        {
            name: "Download",
            icon: "download_2_line",
        },
        null,
        {
            name: "Rename",
            icon: "edit_2_line",
        },
        {
            name: "Move",
            icon: "move_line",
        },
        {
            name: "Delete",
            icon: "delete_3_line",
        },
        null,
        {
            name: "Report",
            icon: "flag_2_line",
        },
        {
            name: "Info and activities",
            icon: "information_line",
        },
    ];

    return (
        <Popover onOpenChange={(open) => console.log("open", open)}>
            <PopoverTrigger>
                <IconButton name="more_2_line" />
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                {items.map((item, index) =>
                    item === null ?
                        <Separator
                            orientation="horizontal"
                            key={index}
                        />
                    :   <Pressable
                            key={index}
                            className="flex-row items-center justify-start py-2 gap-x-4"
                        >
                            <Icon
                                name={item.icon}
                                size={18}
                                color={colors.text}
                            />
                            <Text>{item.name}</Text>
                        </Pressable>,
                )}
            </PopoverContent>
        </Popover>
    );
}
