import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { IconButton } from "./Button";
import Icon from "./Icon";
import { Text } from "./ui/text";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function PlusMenu() {
    const { colors } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton
                    name="add_line"
                    size={22}
                    color={colors.text}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <View>
                            <Icon
                                name="file_upload_line"
                                size={18}
                                color={colors.text}
                            />
                            <Text>Upload file</Text>
                        </View>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <View>
                            <Icon
                                name="new_folder_line"
                                size={18}
                                color={colors.text}
                            />
                            <Text>Create a new folder</Text>
                        </View>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <View>
                            <Icon
                                name="camera_2_line"
                                size={18}
                                color={colors.text}
                            />
                            <Text>Take a photo</Text>
                        </View>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
