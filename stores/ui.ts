import { File, Folder } from "@/graphql/__generated__/graphql";
import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { ColorSchemeName } from "react-native";

export type ListView = "compact" | "comfortable";
type SelectedItem =
    `${NonNullable<(File | Folder)["__typename"]>}:${string}`;

export const sortFields = [
    "name",
    "size",
    "createdAt",
    "updatedAt",
] as const;
export const sortOrder = ["asc", "desc"] as const;

type sortOption =
    `${(typeof sortFields)[number]}:${(typeof sortOrder)[number]}`;

export class UIStore {
    theme: ColorSchemeName = null;
    listView: ListView = "compact";
    selectedItems: Set<SelectedItem> = new Set();
    sort: sortOption = "name:asc";
    searchFocused: boolean = false;

    constructor() {
        makeObservable(this, {
            theme: observable,
            listView: observable,
            selectedItems: observable,
            sort: observable,
            searchFocused: observable,
            isCompact: computed,
            selectionCount: computed,
            sortField: computed,
            setTheme: action,
            setListView: action,
            toggleSelectedItem: action,
            clearSelection: action,
            setSort: action,
            setSearchFocused: action,
        });
    }

    get isCompact() {
        return this.listView === "compact";
    }

    get selectionCount() {
        return this.selectedItems.size;
    }

    get sortField() {
        const [field, order] = this.sort.split(":") as [
            (typeof sortFields)[number],
            (typeof sortOrder)[number],
        ];
        return { field, order };
    }

    setTheme(theme: ColorSchemeName) {
        this.theme = theme;
    }

    setListView(listView: ListView) {
        this.listView = listView;
    }

    toggleSelectedItem(item: SelectedItem) {
        this.selectedItems = new Set(
            _.xor([...this.selectedItems], [item]),
        );
    }

    clearSelection() {
        this.selectedItems = new Set();
    }

    setSort(sort: sortOption) {
        this.sort = sort;
    }

    setSearchFocused(focused: boolean) {
        this.searchFocused = focused;
    }
}
