import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

type TDialogOptions = {
    title?: string;
    message?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

type TUIContext = {
    openDialog: (options: TDialogOptions) => void;
    closeDialog: () => void;
};

const UIContext = createContext<TUIContext | null>(null);

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx)
        throw new Error("useUI must be used within a UIProvider");
    return ctx;
}

export function UIProvider({ children }: PropsWithChildren) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [dialogOptions, setDialogOptions] =
        useState<TDialogOptions | null>(null);

    const dialog = useMemo(
        () => ({
            openDialog: (options: TDialogOptions) => {
                setDialogOptions(options);
                setDialogIsOpen(true);
            },

            closeDialog: () => {
                setDialogOptions(null);
                setDialogIsOpen(false);
            },
        }),
        [],
    );

    return (
        <UIContext.Provider value={dialog}>
            {children}
            <Dialog
                open={dialogIsOpen}
                onOpenChange={setDialogIsOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogOptions?.title}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogOptions?.message}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {dialogOptions?.cancelText && (
                            <DialogClose asChild>
                                <Button
                                    onPress={dialogOptions.onCancel}
                                    variant="outline"
                                >
                                    <Text>
                                        {dialogOptions.cancelText}
                                    </Text>
                                </Button>
                            </DialogClose>
                        )}
                        {dialogOptions?.confirmText && (
                            <DialogClose asChild>
                                <Button
                                    onPress={dialogOptions.onConfirm}
                                    variant="destructive"
                                >
                                    <Text>
                                        {dialogOptions.confirmText}
                                    </Text>
                                </Button>
                            </DialogClose>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </UIContext.Provider>
    );
}
