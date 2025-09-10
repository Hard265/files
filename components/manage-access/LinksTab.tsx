import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function LinksTab() {
    return (
        <View className="items-center py-8 gap-y-4">
            <Icon
                name="link_line"
                size={48}
                className="text-gray-300"
            />
            <View className="items-center gap-y-2">
                <Text className="text-lg font-medium text-gray-900">
                    No shared links
                </Text>
                <Text className="text-center text-gray-600">
                    Create shareable links for easy access
                </Text>
            </View>
            <Button variant="outline">
                <Icon name="add_circle_line" size={20} />
                <Text className="ml-2">Create link</Text>
            </Button>
        </View>
    );
}
