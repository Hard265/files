import { View } from "react-native";
import useFolderPage from "@/hooks/useFolderPage";
import { observer } from "mobx-react-lite";
import FolderContents from "@/components/folder-contents";
import { Suspense, useMemo } from "react";
import { Text } from "@/components/ui/text";
import FolderListHeader from "@/partials/FolderListHeader";
import { FolderContentsSkeleton } from "@/components/folder-contents-skeleton";
import { FolderOpProvider } from "@/providers/FolderOpProvider";

function HomePage() {
    const { ops } = useFolderPage(null);
    return (
        <FolderOpProvider options={ops}>
            <View className="flex-1">
                <Suspense
                    fallback={
                        <View className="items-center justify-center flex-1">
                            <Text>Loading...</Text>
                        </View>
                    }
                >
                    <FolderListHeader />
                </Suspense>
                <Suspense fallback={<FolderContentsSkeleton />}>
                    <FolderContents />
                </Suspense>
            </View>
        </FolderOpProvider>
    );
}

export default observer(HomePage);
