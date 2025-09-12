import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { View, Pressable } from "react-native";
import { Text, TextRef } from "./text";
import { Image, ImageRef } from "expo-image";
import {
    PressableRef,
    SlottablePressableProps,
    SlottableTextProps,
    SlottableViewProps,
    ViewRef,
} from "@rn-primitives/types";
import { cn } from "@/lib/utils";
import { Separator, SeparatorProps, SeparatorRef } from "./separator";

/**
 * @component List
 * @description A container for list items.
 * @props {SlottableViewProps} viewProps - The props for the view component.
 * @returns {React.ReactElement} The rendered list component.
 */
const List = React.forwardRef<ViewRef, SlottableViewProps>(
    ({ asChild, className, ...viewProps }, ref) => {
        const Component = asChild ? Slot.View : View;
        return (
            <Component
                className={cn("p-1", className)}
                {...viewProps}
                ref={ref}
            />
        );
    },
);

List.displayName = "RootList";

/**
 * @component ListGroup
 * @description A container for a group of list items.
 * @props {SlottableViewProps} viewProps - The props for the view component.
 * @returns {React.ReactElement} The rendered list group component.
 */
const ListGroup = React.forwardRef<ViewRef, SlottableViewProps>(
    ({ asChild, ...viewProps }, ref) => {
        const Component = asChild ? Slot.View : View;
        return <Component {...viewProps} ref={ref} />;
    },
);

ListGroup.displayName = "ListGroup";

/**
 * @component ListLabel
 * @description A label for a list group.
 * @props {SlottableTextProps} viewProps - The props for the text component.
 * @returns {React.ReactElement} The rendered list label component.
 */
const ListLabel = React.forwardRef<TextRef, SlottableTextProps>(
    ({ asChild, className, ...props }, ref) => {
        const Component = asChild ? Slot.Text : Text;
        return (
            <Component
                className={cn(
                    "text-foreground px-2 py-2 text-sm font-medium sm:py-1.5",
                    className,
                )}
                {...props}
                ref={ref}
            />
        );
    },
);
ListLabel.displayName = "ListLabel";

/**
 * @component ListItem
 * @description A pressable list item.
 * @props {SlottablePressableProps} viewProps - The props for the pressable component.
 * @returns {React.ReactElement} The rendered list item component.
 */
const ListItem = React.forwardRef<
    PressableRef,
    SlottablePressableProps & { variant?: "default" | "destructive" }
>(({ asChild, className, variant, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
        <Component
            className={cn(
                "active:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-2 sm:py-1.5",
                variant === "destructive"
                    && "active:bg-destructive/10 dark:active:bg-destructive/20",
                props.disabled && "opacity-50",
                className,
            )}
            {...props}
            ref={ref}
        />
    );
});

ListItem.displayName = "ListItem";

/**
 * @component ListItemTitle
 * @description The title of a list item.
 * @props {SlottableTextProps} viewProps - The props for the text component.
 * @returns {React.ReactElement} The rendered list item title component.
 */
const ListItemTitle = React.forwardRef<TextRef, SlottableTextProps>(
    ({ asChild, className, ...viewProps }, ref) => {
        const Component = asChild ? Slot.Text : Text;
        return (
            <Component
                {...viewProps}
                variant="h3"
                className={cn(className)}
                ref={ref}
            />
        );
    },
);
ListItemTitle.displayName = "ListItemTitle";

/**
 * @component ListItemSubtitle
 * @description The subtitle of a list item.
 * @props {SlottableTextProps} props - The props for the text component.
 * @returns {React.ReactElement} The rendered list item subtitle component.
 */
const ListItemSubtitle = React.forwardRef<
    TextRef,
    SlottableTextProps
>(({ asChild, ...viewProps }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return <Component {...viewProps} ref={ref} variant="muted" />;
});
ListItemSubtitle.displayName = "ListItemSubtitle";

/**
 * @component ListItemStart
 * @description A container for the start of a list item.
 * @props {SlottableViewProps} viewProps - The props for the view component.
 * @returns {React.ReactElement} The rendered list item start component.
 */
const ListItemStart = React.forwardRef<ViewRef, SlottableViewProps>(
    ({ asChild, ...viewProps }, ref) => {
        const Component = asChild ? Slot.View : View;
        return <Component {...viewProps} ref={ref} />;
    },
);
ListItemStart.displayName = "ListItemStart";

/**
 * @component ListItemEnd
 * @description A container for the end of a list item.
 * @props {SlottableViewProps} viewProps - The props for the view component.
 * @returns {React.ReactElement} The rendered list item end component.
 */
const ListItemEnd = React.forwardRef<ViewRef, SlottableViewProps>(
    ({ asChild, ...viewProps }, ref) => {
        const Component = asChild ? Slot.View : View;
        return <Component {...viewProps} ref={ref} />;
    },
);
ListItemEnd.displayName = "ListItemEnd";

const ListSeperator = React.forwardRef<SeparatorRef, SeparatorProps>(
    ({ className, ...props }) => {
        return (
            <Separator
                className={cn("bg-border -mx-1 my-1 h-px", className)}
                {...props}
            />
        );
    },
);

ListSeperator.displayName = "ListSeperator";

/**
 * @component ListItemImage
 * @description An image for a list item.
 * @props {SlottableViewProps} imageProps - The props for the image component.
 * @returns {React.ReactElement} The rendered list item image component.
 */
const ListItemImage = React.forwardRef<ImageRef, SlottableViewProps>(
    ({ asChild, ...imageProps }, ref) => {
        const Component = asChild ? Slot.Image : Image;
        return <Component {...imageProps} ref={ref as any} />;
    },
);
ListItemImage.displayName = "ListItemImage";

export {
    List,
    ListGroup,
    ListLabel,
    ListItem,
    ListItemTitle,
    ListItemSubtitle,
    ListItemStart,
    ListItemEnd,
    ListItemImage,
    ListSeperator,
};
