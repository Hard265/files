import FolderDrawerContent from "@/components/folder-drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "@/pages/Home";
import Folder from "@/pages/Folder";
import FolderPageHeader from "@/components/folder-page-header";

const HomeDrawerNavigator = createDrawerNavigator();
export default function HomeDrawer() {
    return (
        <HomeDrawerNavigator.Navigator
            drawerContent={(props) => <FolderDrawerContent {...props} />}
            backBehavior="history"
            screenOptions={{
                header: (props) => <FolderPageHeader {...props} />,
            }}
        >
            <HomeDrawerNavigator.Screen name="Home" component={HomePage} />
            <HomeDrawerNavigator.Screen
                name="Folder"
                component={Folder}
            />
        </HomeDrawerNavigator.Navigator>
    );
}
