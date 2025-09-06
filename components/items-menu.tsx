import { useTheme } from "@react-navigation/native";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { Text } from "./ui/text";
import { IconButton } from "./Button";
import Icon from "./Icon";
import {
    Pressable,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";
import { ComponentProps, memo, Suspense, useState } from "react";
import { Separator } from "./ui/separator";
import {
    File,
    Folder,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { useSuspenseFragment } from "@apollo/client/react";
import { formatBytesIEC } from "@/utils";
import dayjs from "dayjs";

interface IItemMenuProps {
    refs: `${NonNullable<(Folder | File)["__typename"]>}:${string}`[];
}

const Options = memo(function Options(
    props: Pick<IItemMenuProps, "refs">,
) {
    const { colors } = useTheme();
    const dimensions = useWindowDimensions();
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
        <>
            <Text>
                {count > 1 ?
                    `${count} selected`
                :   (data as any)?.name}
            </Text>
            <Separator orientation="horizontal" />
            <ScrollView
                style={{ maxHeight: dimensions.height / 1.5 }}
            >
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
            </ScrollView>
            <Separator orientation="horizontal" />
            {props.refs.length === 1 && (
                <View className="py-2.5 flex-col gap-y-1 px-4">
                    <Text variant="small">
                        Created at:{" "}
                        {dayjs((data as any)?.createdAt).format(
                            "DD MMM YYYY HH:mm",
                        )}
                    </Text>
                    {data.__typename === "File" && (
                        <Text variant="small">
                            Size:{" "}
                            {formatBytesIEC((data as any)?.size)}
                        </Text>
                    )}
                </View>
            )}
        </>
    );
});

export function ItemsMenu(props: IItemMenuProps) {
    const [shown, setShown] = useState(false);

    return (
        <Popover onOpenChange={(open) => setShown(open)}>
            <PopoverTrigger>
                <IconButton name="more_2_line" />
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <Suspense fallback={<Text>Loading...</Text>}>
                    {props.refs.length > 0 && shown && (
                        <Options refs={props.refs} />
                    )}
                </Suspense>
            </PopoverContent>
        </Popover>
    );
}
