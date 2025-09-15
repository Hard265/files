import { Text } from "@/components/ui/text";
import store from "@/stores";
import { observer } from "mobx-react-lite";

function SearchPage() {
    return store.ui.searchOpen ? <Text>Search Page</Text> : <></>;
}

export default observer(SearchPage);
