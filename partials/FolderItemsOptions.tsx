import { IconButton, Text } from "@/components";
import Icon from "@/components/Icon";
import {
    File,
    Folder,
    FolderOrFileFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { formatBytesIEC } from "@/utils";
import { useSuspenseFragment } from "@apollo/client/react";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { ComponentProps, memo, Suspense, useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";

interface IFolderItemsOptionsProps {
    disabled?: boolean;
    refs: `${NonNullable<(Folder | File)["__typename"]>}:${string}`[];
}

const Options = memo(function Options(
    props: Pick<IFolderItemsOptionsProps, "refs">,
) {
    const { colors } = useTheme();
    const dimensions = useWindowDimensions()
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
            <View
                className="py-2.5 px-4 border-b"
                style={{
                    borderColor: colors.border,
                }}
            >
                <Text>
                    {count > 1 ?
                        `${count} selected`
                    :   (data as any)?.name}
                </Text>
            </View>
            <ScrollView
                style={{ maxHeight: dimensions.height / 1.5 }}
            >
                {items.map((item, index) =>
                    item === null ?
                        <View
                            key={index}
                            className="w-full border-t my-2.5"
                            style={{
                                borderColor: colors.border,
                            }}
                        />
                    :   <MenuOption key={index}>
                            <Icon
                                name={item.icon}
                                size={20}
                                color={colors.text}
                            />
                            <Text className="ml-2">{item.name}</Text>
                        </MenuOption>,
                )}
            </ScrollView>
            {props.refs.length === 1 && (
                <View
                    className="py-2.5 flex-col gap-y-1 px-4 border-t"
                    style={{
                        borderColor: colors.border,
                    }}
                >
                    <Text variant="footnote">
                        Created at:{" "}
                        {dayjs((data as any)?.createdAt).format(
                            "DD MMM YYYY HH:mm",
                        )}
                    </Text>
                    {data.__typename === "File" && (
                        <Text variant="footnote">
                            Size:{" "}
                            {formatBytesIEC((data as any)?.size)}
                        </Text>
                    )}
                </View>
            )}
        </>
    );
});

export default function FolderItemsOptions(
    props: IFolderItemsOptionsProps,
) {
    const { colors } = useTheme();
    const [shown, setShown] = useState(false);

    return (
        <Menu
            onOpen={() => setShown(true)}
            onClose={() => setShown(false)}
        >
            <MenuTrigger disabled={props.disabled}>
                <IconButton
                    name="more_2_fill"
                    disabled={props.disabled}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: colors.card,
                        borderRadius: 5,
                        borderColor: colors.border,
                        width: "auto",
                        borderWidth: StyleSheet.hairlineWidth,
                    },
                    optionWrapper: {
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        columnGap: 16,
                    },
                }}
            >
                <Suspense fallback={<Text>Loading...</Text>}>
                    {props.refs.length > 0 && shown && (
                        <Options refs={props.refs} />
                    )}
                </Suspense>
            </MenuOptions>
        </Menu>
    );
}
