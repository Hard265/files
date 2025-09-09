import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

const FolderContentsEmpty: React.FC = () => {
    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text variant="p">
                No items in this folder to display
            </Text>
            <Button variant="link">
                <Text>Create a new folder</Text>
            </Button>
        </View>
    );
};

export default FolderContentsEmpty;
