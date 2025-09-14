import store from "@/stores";
import useBackHandler from "./useBackHandler";

export default function useFolderPage(id: string | null = null) {
    useBackHandler(store.ui.selectionCount > 0, () => {
        store.ui.clearSelection();
    });

    return {
        id,
    };
}
