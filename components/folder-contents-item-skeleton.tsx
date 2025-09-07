import { Skeleton } from "@/components/ui/skeleton";
import { View } from "react-native";

export function FolderContentsItemSkeleton() {
    return (
        <View className="flex flex-row items-start p-4 gap-4">
            <Skeleton className="rounded size-5" />
            <View className="gap-2">
                <Skeleton className="h-5 w-[275px] rounded-sm" />
                <Skeleton className="h-4 w-[150px] rounded-sm" />
            </View>
        </View>
    );
}
