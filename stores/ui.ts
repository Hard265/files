import { File, Folder } from "@/graphql/__generated__/graphql";
import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";

type ListView = "compact" | "comfortable";
type SelectedItem =
    `${NonNullable<(File | Folder)["__typename"]>}:${string}`;

export class UIStore {
    listView: ListView = "compact";
    selectedItems: Set<SelectedItem> = new Set();
    constructor() {
        makeObservable(this, {
            listView: observable,
            selectedItems: observable,
            isCompact: computed,
            selectionCount: computed,
            setListView: action,
            toggleSelectedItem: action,
        });
    }

    get isCompact() {
        return this.listView === "compact";
    }

    get selectionCount() {
        return this.selectedItems.size;
    }

    setListView(listView: ListView) {
        this.listView = listView;
    }

    toggleSelectedItem(item: SelectedItem) {
        this.selectedItems = new Set(
            _.xor([...this.selectedItems], [item]),
        );
    }
}
