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
import { memo, Suspense, useState } from "react";
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
    const isMultiple = count > 1;

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
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="user_add_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Share</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="group_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Manage access</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="star_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Add to starred</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="wifi_off_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Make available offline</Text>
                    </Pressable>
                </PopoverClose>
                <Separator orientation="horizontal" />
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="link_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Copy link</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="copy_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Make a copy</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="forward_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Send a copy</Text>
                    </Pressable>
                </PopoverClose>
                <Separator orientation="horizontal" />
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="download_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Download</Text>
                    </Pressable>
                </PopoverClose>
                {!isMultiple && (
                    <PopoverClose asChild>
                        <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                            <Icon
                                name="edit_2_line"
                                size={18}
                                color={colors.text}
                            />
                            <Text>Rename</Text>
                        </Pressable>
                    </PopoverClose>
                )}
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="file_export_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Move</Text>
                    </Pressable>
                </PopoverClose>
                <Dialog>
                    <PopoverClose asChild>
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
                    </PopoverClose>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Delete{" "}
                                {isMultiple ?
                                    `${count} items`
                                :   data.__typename}
                                ?
                            </DialogTitle>
                            <DialogDescription>
                                This will delete{" "}
                                <Text className="font-medium">
                                    {isMultiple ?
                                        `${count} items`
                                    :   (data as any)?.name}
                                </Text>
                                . This action cannot be undone.
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
                <Separator orientation="horizontal" />
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                        <Icon
                            name="flag_1_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Report</Text>
                    </Pressable>
                </PopoverClose>
                {!isMultiple && (
                    <PopoverClose asChild>
                        <Pressable className="flex-row items-center justify-start py-2 gap-x-4">
                            <Icon
                                name="information_line"
                                size={18}
                                color={colors.text}
                            />
                            <Text>Info and activities</Text>
                        </Pressable>
                    </PopoverClose>
                )}
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
