import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@/components/primitives/separator";

function Separator({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}: SeparatorPrimitive.RootProps
    & React.RefAttributes<SeparatorPrimitive.RootRef>) {
    return (
        <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "bg-border shrink-0",
                orientation === "horizontal" ? "h-[1px] w-full" : (
                    "h-full w-[1px]"
                ),
                className,
            )}
            {...props}
        />
    );
}

type SeparatorProps = SeparatorPrimitive.RootProps;
type SeparatorRef = SeparatorPrimitive.RootRef;

export { Separator, type SeparatorProps, type SeparatorRef };
