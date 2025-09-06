import { File, Folder } from "@/graphql/__generated__/graphql";
import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";

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
    listView: ListView = "compact";
    selectedItems: Set<SelectedItem> = new Set();
    sort: sortOption = "name:asc";

    constructor() {
        makeObservable(this, {
            listView: observable,
            selectedItems: observable,
            sort: observable,
            isCompact: computed,
            selectionCount: computed,
            sortField: computed,
            setListView: action,
            toggleSelectedItem: action,
            clearSelection: action,
            setSort: action,
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
}
