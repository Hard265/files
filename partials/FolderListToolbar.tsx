import { IconButton } from "@/components";
import Checkbox from "@/components/Checkbox";
import Popup from "@/components/Popup";
import { Text } from "@/components/Text";
import store, { ListView, sortFields } from "@/stores";
import { observer } from "mobx-react-lite";
import { View } from "react-native";

function FolderListToolbar() {
    const hasSelection = store.ui.selectionCount > 0;
    const isAscOrder = store.ui.sortField.order === "asc";

    return (
        <View className="flex-row items-center justify-between px-3">
            <View className="flex-row items-center gap-x-4">
                <Checkbox />
                <IconButton
                    name={
                        isAscOrder ?
                            "sort_ascending_line"
                        :   "sort_descending_line"
                    }
                    onPress={() =>
                        store.ui.setSort(
                            `${store.ui.sortField.field}:${
                                isAscOrder ? "desc" : "asc"
                            }`,
                        )
                    }
                />
                <SortMenu />
            </View>
            {hasSelection && (
                <Text>{store.ui.selectionCount} seleted</Text>
            )}
            <ListViewMenu />
        </View>
    );
}

const SortMenu = observer(() => {
    const onChange = (field: (typeof sortFields)[number]) => {
        store.ui.setSort(`${field}:${store.ui.sortField.order}`);
    };
    return (
        <Popup
            onChange={onChange as any}
            items={[
                {
                    label: "Name",
                    value: "name",
                },
                {
                    label: "Size",
                    value: "size",
                },
                {
                    label: "Created At",
                    value: "createdAt",
                },
                {
                    label: "Updated At",
                    value: "updatedAt",
                },
            ]}
        >
            <Text>Name</Text>
        </Popup>
    );
});

const ListViewMenu = observer(() => {
    return (
        <Popup
            onChange={(view) => store.ui.setListView(view as any)}
            items={[
                {
                    label: "Comfortable",
                    value: "comfortable" as ListView,
                    icon: "list_check_3_line",
                },
                {
                    label: "Compact",
                    value: "compact" as ListView,
                    icon: "list_check_line",
                },
            ]}
        >
            <IconButton
                onPress={() =>
                    store.ui.setListView(
                        store.ui.isCompact ?
                            "comfortable"
                        :   "compact",
                    )
                }
                name="menu_line"
            />
        </Popup>
    );
});

export default observer(FolderListToolbar);
