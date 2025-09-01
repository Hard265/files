import Animated from "react-native-reanimated";
import FolderListToolbar from "./FolderListToolbar";
import { useSuspenseFragment } from "@apollo/client/react";
import { FolderFieldsFragmentDoc } from "@/graphql/__generated__/graphql";
import { Text } from "@/components/Text";
import { Skeleton } from "@/components/Skeleton";

export default function FolderListHeader({ id }: { id: string }) {
    const { data } = useSuspenseFragment({
        fragment: FolderFieldsFragmentDoc,
        from: {
            __ref: `Folder:${id}`,
        },
    });

    return (
        <Animated.View>
            <Text variant="largeTitle">{data.name}</Text>
            <FolderListToolbar />
        </Animated.View>
    );
}

export function FolderListHeaderSkeleton() {
    return (
        <Skeleton>
            <Skeleton.Text
                lines={1}
                lastLineWidth={120}
                lineHeight={48}
            />
            <Skeleton.Box height={40} borderRadius={8} />
        </Skeleton>
    );
}
