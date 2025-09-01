import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { Text } from "@/components/Text";
import store from "@/stores";
import { useTheme } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Pressable, View } from "react-native";

function FolderListToolbar() {
    const { colors } = useTheme();
    const { ui } = store;
    return (
        <View className="flex-row items-center px-3 gap-x-4">
            <Checkbox />
            <Text>Name</Text>
            <View className="flex-1" />
            {ui.selectionCount > 0 && (
                <Text>{ui.selectionCount} seleted</Text>
            )}
            <Pressable
                onPress={() =>
                    ui.setListView(
                        ui.isCompact ? "comfortable" : "compact",
                    )
                }
            >
                <Icon
                    name="list_expansion_line"
                    size={24}
                    color={colors.text}
                />
            </Pressable>
        </View>
    );
}

export default observer(FolderListToolbar);
