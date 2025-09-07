import { useTheme } from "@react-navigation/native";
import { Pressable } from "react-native";
import { IconButton } from "./Button";
import Icon from "./Icon";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from "./ui/popover";
import { Separator } from "./ui/separator";
import { Text } from "./ui/text";

export function PlusMenu() {
    const { colors } = useTheme();
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    name="add_line"
                    size={22}
                    color={colors.text}
                />
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="w-auto p-0"
            >
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center px-4 py-2 gap-x-4">
                        <Icon
                            name="file_upload_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Upload file</Text>
                    </Pressable>
                </PopoverClose>
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center px-4 py-2 gap-x-4">
                        <Icon
                            name="camera_2_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Take a photo</Text>
                    </Pressable>
                </PopoverClose>
                <Separator />
                <PopoverClose asChild>
                    <Pressable className="flex-row items-center px-4 py-2 gap-x-4">
                        <Icon
                            name="new_folder_line"
                            size={18}
                            color={colors.text}
                        />
                        <Text>Create a new folder</Text>
                    </Pressable>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
}
