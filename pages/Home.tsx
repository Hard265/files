import { View } from "react-native";
import useFolderPage from "@/hooks/useFolderPage";
import { observer } from "mobx-react-lite";
import FolderContents from "@/components/folder-contents";
import { Suspense } from "react";
import { Text } from "@/components/ui/text";
import { FolderContentsSkeleton } from "@/components/folder-contents-skeleton";
import { FolderContentsHeader } from "@/components/folder-contents-header";
import FolderOpsProvider from "@/providers/FolderOpsProvider";

function HomePage() {
    const { id } = useFolderPage(null);
    return (
        <FolderOpsProvider id={id}>
            <View className="flex-1">
                <Suspense
                    fallback={
                        <View className="items-center justify-center flex-1">
                            <Text>Loading...</Text>
                        </View>
                    }
                >
                    <FolderContentsHeader />
                </Suspense>
                <Suspense fallback={<FolderContentsSkeleton />}>
                    <FolderContents />
                </Suspense>
            </View>
        </FolderOpsProvider>
    );
}

export default observer(HomePage);
