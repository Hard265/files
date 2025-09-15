import FolderDrawerContent from "@/components/folder-drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "@/pages/Home";
import Folder from "@/pages/Folder";
import FolderPageHeader from "@/components/folder-page-header";
import HomeLayout from "@/layouts/HomeLayout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStackFolderStackNavigator = createNativeStackNavigator();

function FolderStack() {
    return (
        <HomeStackFolderStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
            initialRouteName="Folder"
        >
            <HomeStackFolderStackNavigator.Screen
                name="Folder"
                component={Folder}
            />
        </HomeStackFolderStackNavigator.Navigator>
    );
}

const HomeDrawerNavigator = createDrawerNavigator();

export default function HomeDrawer() {
    return (
        <HomeDrawerNavigator.Navigator
            drawerContent={(props) => <FolderDrawerContent {...props} />}
            backBehavior="history"
            layout={(props) => <HomeLayout {...props} />}
            screenOptions={{
                header: (props) => <FolderPageHeader {...props} />,
            }}
        >
            <HomeDrawerNavigator.Screen name="Home" component={HomePage} />
            <HomeDrawerNavigator.Screen
                name="FolderStack"
                component={FolderStack}
            />
        </HomeDrawerNavigator.Navigator>
    );
}
