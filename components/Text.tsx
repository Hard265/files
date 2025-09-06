import { VariantProps, cva } from "class-variance-authority";
import { cssInterop } from "nativewind";
import * as React from "react";
import { UITextView } from "react-native-uitextview";

import { cn } from "@/lib/cn";

cssInterop(UITextView, { className: "style" });

const textVariants = cva("text-foreground", {
    variants: {
        variant: {
            largeTitle: "text-4xl font-[RoobertBold]",
            title1: "text-2xl",
            title2: "text-[22px] leading-7",
            title3: "text-xl",
            heading: "text-[17px] leading-6 font-semibold",
            body: "text-[17px] leading-6 font-[NeueMontrealRegular]",
            callout: "text-base",
            subhead:
                "text-[15px] leading-6 font-[NeueMontrealRegular]",
            footnote:
                "text-[13px] leading-5 font-[NeueMontrealRegular]",
            caption1: "text-xs",
            caption2: "text-[11px] leading-4",
        },
        color: {
            primary: "text-zinc-950 dark:text-white",
            error: "text-red-500",
            secondary: "text-secondary-foreground/90",
            tertiary: "text-muted-foreground/90",
            quarternary: "text-muted-foreground/50",
        },
    },
    defaultVariants: {
        variant: "body",
        color: "primary",
    },
});

const TextClassContext = React.createContext<string | undefined>(
    undefined,
);

function Text({
    className,
    variant,
    color,
    ...props
}: React.ComponentPropsWithoutRef<typeof UITextView>
    & VariantProps<typeof textVariants>) {
    const textClassName = React.useContext(TextClassContext);
    return (
        <UITextView
            className={cn(
                textVariants({ variant, color }),
                textClassName,
                className,
            )}
            {...props}
        />
    );
}

export { Text, TextClassContext, textVariants };
