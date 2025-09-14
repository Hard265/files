import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

function FolderDrawerContent(props: DrawerContentComponentProps) {
    const route = props.state.routes[props.state.index];

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default FolderDrawerContent;
