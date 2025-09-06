import { IconButton } from "@/components";
import Checkbox from "@/components/Checkbox";
import { Text } from "@/components/Text";
import store, { ListView, sortFields } from "@/stores";
import { observer } from "mobx-react-lite";
import { Pressable, View } from "react-native";
import { ItemsMenu } from "@/components/items-menu";
import {
    Popover,
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
                        <Text variant="title3">
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
                <Text className="capitalize">
                    {store.ui.sortField.field}
                </Text>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="w-auto"
            >
                {fields.map((field) => (
                    <Pressable
                        onPress={() => onChange(field.value)}
                        key={field.value}
                        className="px-4 py-2 flex-row items-center gap-x-2"
                    >
                        <Text>{field.label}</Text>
                    </Pressable>
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
                <IconButton name="more_2_line" />
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="w-auto"
            >
                {list.map((view) => (
                    <Pressable
                        onPress={() =>
                            store.ui.setListView(view.value)
                        }
                        key={view.value}
                        className="px-4 py-2 flex-row items-center gap-x-2"
                    >
                        <Text>{view.label}</Text>
                    </Pressable>
                ))}
            </PopoverContent>
        </Popover>
    );
});

export default observer(FolderListToolbar);
