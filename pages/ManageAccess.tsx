import { Header } from "@/components/manage-access/Header";
import { LinksTab } from "@/components/manage-access/LinksTab";
import { PeopleTab } from "@/components/manage-access/PeopleTab";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import {
    FilePermissionFieldsFragment,
    FolderPermissionFieldsFragment,
    ItemAccessDetailsDocument,
} from "@/graphql/__generated__/graphql";
import { RootStackParamsList } from "@/Router";
import { useSuspenseQuery } from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";

// Type definitions
type ItemType = "File" | "Folder";
type TabType = "people" | "links";

// Utility functions
const parseItemRef = (
    ref: string,
): [ItemType | null, string | null] => {
    const parts = ref.split(":");
    if (parts.length !== 2) return [null, null];

    const [type, id] = parts;
    if (type !== "File" && type !== "Folder") return [null, null];

    return [type, id];
};

export default function ManageAccessPage({
    route,
}: NativeStackScreenProps<RootStackParamsList, "ManageAccess">) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList>
        >();
    const [type, id] = parseItemRef(route.params.ref);
    const tab = (route.params.tab ?? "people") as TabType;

    const { data, error } = useSuspenseQuery(
        ItemAccessDetailsDocument,
        {
            variables: {
                id,
                isFolder: type === "Folder",
                isFile: type === "File",
            },
            errorPolicy: "all",
        },
    );

    const permissions = useMemo(
        () =>
            [
                ...(data?.filePermissionsByFileId ?? []),
                ...(data?.folderPermissionsByFolderId ?? []),
            ] as (
                | FolderPermissionFieldsFragment
                | FilePermissionFieldsFragment
            )[],
        [
            data?.filePermissionsByFileId,
            data?.folderPermissionsByFolderId,
        ],
    );

    const onSwitchTab = useCallback(
        (newTab: string) => {
            if (newTab === "people" || newTab === "links") {
                navigation.setParams({
                    ...route.params,
                    tab: newTab as TabType,
                });
            }
        },
        [navigation, route.params],
    );

    const onStartSharing = useCallback(() => {
        // TODO: Implement sharing logic
        console.log("Start sharing clicked");
    }, []);

    return (
        <ScrollView className="flex-1">
            <Header ref={route.params.ref} />

            <View className="p-4">
                <Tabs
                    value={tab}
                    onValueChange={onSwitchTab}
                    className="w-full"
                >
                    <TabsList className="w-full bg-transparent">
                        <TabsTrigger
                            value="people"
                            className="flex-1"
                        >
                            <Text>People ({permissions.length})</Text>
                        </TabsTrigger>
                        <TabsTrigger value="links" className="flex-1">
                            <Text>Links</Text>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="people" className="mt-6">
                        <PeopleTab
                            permissions={permissions}
                            onStartSharing={onStartSharing}
                        />
                    </TabsContent>

                    <TabsContent value="links" className="mt-6">
                        <LinksTab />
                    </TabsContent>
                </Tabs>
            </View>
        </ScrollView>
    );
}