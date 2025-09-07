import { useTheme } from "@react-navigation/native";
import {
    Popover,
    PopoverClose,
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
    DeleteFolderDocument,
    File,
    Folder,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import {
    useMutation,
    useSuspenseFragment,
} from "@apollo/client/react";
import { formatBytesIEC } from "@/utils";
import dayjs from "dayjs";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

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

    const [deleteFolder] = useMutation(DeleteFolderDocument, {
        optimisticResponse: {
            __typename: "Mutation",
            deleteFolder: true,
        },
        update(cache, { data }) {
            if (!data?.deleteFolder) return;

            cache.evict({ id: cache.identify(data) });
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
    ];

    return (
        <>
            <Text className="mb-2">
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
                <PopoverClose asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                                <Icon
                                    name="delete_3_line"
                                    size={18}
                                    color={colors.text}
                                />
                                <Text>Delete</Text>
                            </Pressable>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure?
                                </DialogTitle>
                                <DialogDescription>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Sit
                                    illum ad, sequi et porro corporis
                                    reprehenderit tenetur eius! Atque,
                                    minima!
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">
                                        <Text>Cancel</Text>
                                    </Button>
                                </DialogClose>
                                <Button
                                    onPress={() =>
                                        deleteFolder({
                                            variables: {
                                                id: (data as any)?.id,
                                            },
                                        })
                                    }
                                    variant="destructive"
                                >
                                    <Text>Delete</Text>
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </PopoverClose>
                <Separator orientation="horizontal" />
                <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                    <Icon
                        name="flag_1_line"
                        size={18}
                        color={colors.text}
                    />
                    <Text>Report</Text>
                </Pressable>
                <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                    <Icon
                        name="information_line"
                        size={18}
                        color={colors.text}
                    />
                    <Text>Info and activities</Text>
                </Pressable>
            </ScrollView>
            <Separator orientation="horizontal" />
            {props.refs.length === 1 && (
                <View className="flex-col mt-2 gap-y-1">
                    <Text variant="muted">
                        Created at:{" "}
                        {dayjs((data as any)?.createdAt).format(
                            "DD MMM YYYY HH:mm",
                        )}
                    </Text>
                    {data.__typename === "File" && (
                        <Text variant="muted">
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
                <IconButton name="more_2_fill" size={22} />
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
