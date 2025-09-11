import { useFolderOps } from "@/hooks/useFolderOps";
import { createContext, PropsWithChildren, useContext } from "react";

const FolderOpsContext = createContext<ReturnType<
    typeof useFolderOps
> | null>(null);

export const useFolderOpsContext = () => {
    const ctx = useContext(FolderOpsContext);
    if (!ctx)
        throw new Error(
            "useFolderOpsContext must be used within a FolderOpsProvider",
        );
    return ctx;
};

export default function FolderOpsProvider({
    id,
    children,
}: PropsWithChildren<{ id: string | null }>) {
    const ops = useFolderOps(id);
    return (
        <FolderOpsContext.Provider value={ops}>
            {children}
        </FolderOpsContext.Provider>
    );
}
