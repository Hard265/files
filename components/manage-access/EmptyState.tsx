import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function EmptyState({
    onStartSharing,
}: {
    onStartSharing: () => void;
}) {
    return (
        <View className="items-center py-8 gap-y-4">
            <Icon
                name="group_3_line"
                size={48}
                className="text-gray-300"
            />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No one has access yet
                </Text>
                <Text className="text-center text-gray-600">
                    Share this item to collaborate with others
                </Text>
            </View>
            <Button variant="default" onPress={onStartSharing}>
                <Icon name="add_circle_line" size={20} />
                <Text className="ml-2">Start sharing</Text>
            </Button>
        </View>
    );
}
