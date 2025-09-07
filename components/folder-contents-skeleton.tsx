import { View } from "react-native";
import { FolderContentsItemSkeleton } from "./folder-contents-item-skeleton";

export function FolderContentsSkeleton() {
    return (
        <View className="flex flex-col gap-2">
            <FolderContentsItemSkeleton />
            <FolderContentsItemSkeleton />
            <FolderContentsItemSkeleton />
            <FolderContentsItemSkeleton />
        </View>
    );
}
