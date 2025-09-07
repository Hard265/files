import { IconButton } from "@/components";
import Checkbox from "@/components/Checkbox";
import { Text } from "@/components/ui/text";
import store, { ListView, sortFields } from "@/stores";
import { observer } from "mobx-react-lite";
import { Pressable, View } from "react-native";
import { ItemsMenu } from "@/components/items-menu";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function FolderListToolbar() {
    const hasSelection = store.ui.selectionCount > 0;

    return (
        <View className="flex-row items-center justify-between px-3 pb-2">
            <View className="flex-row items-center gap-x-4">
                <Checkbox />
                <SortMenu />
            </View>
            <View className="flex-row items-center gap-x-4">
                {hasSelection ?
                    <>
                        <Text variant="large">
                            {store.ui.selectionCount} selected
                        </Text>
                        <ItemsMenu
                            refs={[...store.ui.selectedItems]}
                        />
                    </>
                :   <ListViewMenu />}
            </View>
        </View>
    );
}

const SortMenu = observer(() => {
    const onChange = (field: (typeof sortFields)[number]) => {
        store.ui.setSort(`${field}:${store.ui.sortField.order}`);
    };

    const fields: {
        label: string;
        value: (typeof sortFields)[number];
    }[] = [
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
    ];

    return (
        <Popover>
            <PopoverTrigger>
                <Text variant="large" className="capitalize">
                    {store.ui.sortField.field}
                </Text>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                className="w-auto p-0"
            >
                {fields.map((field) => (
                    <PopoverClose asChild key={field.value}>
                        <Pressable
                            onPress={() => onChange(field.value)}
                            className="flex-row items-center justify-between px-4 py-2 gap-x-2"
                        >
                            <Text>{field.label}</Text>
                            <View className="-my-2 -mr-2 size-8">
                                {store.ui.sortField.field
                                    === field.value && (
                                    <IconButton
                                        name="check_line"
                                        size={18}
                                    />
                                )}
                            </View>
                        </Pressable>
                    </PopoverClose>
                ))}
            </PopoverContent>
        </Popover>
    );
});

const ListViewMenu = observer(() => {
    const list = [
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
    ];
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton name="menu_line" size={22} />
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="w-auto p-0"
            >
                {list.map((view) => (
                    <PopoverClose asChild key={view.value}>
                        <Pressable
                            onPress={() =>
                                store.ui.setListView(view.value)
                            }
                            className="flex-row items-center justify-between px-4 py-2 gap-x-4"
                        >
                            <Text>{view.label}</Text>
                            <View className="-my-2 -mr-2 size-8">
                                {store.ui.listView === view.value && (
                                    <IconButton
                                        name="check_line"
                                        size={18}
                                    />
                                )}
                            </View>
                        </Pressable>
                    </PopoverClose>
                ))}
            </PopoverContent>
        </Popover>
    );
});

export default observer(FolderListToolbar);
