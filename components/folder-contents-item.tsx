import Icon from "@/components/Icon";
import ListItem from "@/components/ListItem";
import {
    FileFieldsFragment,
    FileFieldsFragmentDoc,
    FolderFieldsFragment,
    FolderFieldsFragmentDoc,
} from "@/graphql/__generated__/graphql";
import store from "@/stores";
import { useSuspenseFragment } from "@apollo/client/react";
import { useTheme } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { formatBytesIEC } from "@/utils";

type ItemUnion = FolderFieldsFragment | FileFieldsFragment;

function FolderContentsItem({
    id,
    type,
    onOpen,
}: {
    id: string;
    type: ItemUnion["__typename"];
    onOpen(): void;
}) {
    const { ui } = store;
    const { colors } = useTheme();
    const { data } = useSuspenseFragment<ItemUnion>({
        fragment:
            type === "Folder" ?
                FolderFieldsFragmentDoc
            :   FileFieldsFragmentDoc,
        from: {
            __ref: `${type}:${id}`,
        },
    });

    const subtitle = useMemo(() => {
        const size =
            data.__typename === "File" ?
                formatBytesIEC(data.size)
            :   " ";
        return dayjs(data.updatedAt).format(
            `[Modified] DD YYYY [${size}]`,
        );
        //@ts-ignore
    }, [data.__typename, data.size, data.updatedAt]);

    const __ref = useMemo(() => `${type}:${id}`, [id, type]);

    const selectHandler = useCallback(() => {
        ui.toggleSelectedItem(__ref as any);
    }, [__ref, ui]);

    const pressHandler = useCallback(() => {
        if (ui.selectionCount > 0) return selectHandler();
        onOpen();
    }, [onOpen, selectHandler, ui.selectionCount]);

    return (
        <ListItem
            title={data.name}
            subtitle={subtitle}
            isCompact={ui.isCompact}
            onPress={pressHandler}
            icon={
                type === "Folder" ?
                    <Icon
                        name="folder_star_line"
                        size={24}
                        color={"orange"}
                    />
                :   <Icon
                        name="document_3_line"
                        size={24}
                        color={colors.text}
                    />
            }
            hasCheckbox
            checked={ui.selectedItems.has(__ref as any)}
            onCheckedChange={selectHandler}
        />
    );
}

export default observer(FolderContentsItem);
