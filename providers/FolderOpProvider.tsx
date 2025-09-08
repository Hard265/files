import { createContext, PropsWithChildren, useContext } from "react";

type FolderOpContextType = {
    delete?(refs: string[]): void;
};

const FolderOpContext = createContext<FolderOpContextType | null>(
    null,
);

export function useFolderOp() {
    const ctx = useContext(FolderOpContext);
    if (!ctx)
        throw new Error(
            "useFolderOp must be used within a FolderOpProvider",
        );
    return ctx;
}

export function FolderOpProvider({
    children,
    ...props
}: PropsWithChildren<{ options: FolderOpContextType }>) {
    return (
        <FolderOpContext.Provider value={props.options}>
            {children}
        </FolderOpContext.Provider>
    );
}
