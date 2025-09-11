import {
    DeleteFileDocument,
    DeleteFolderDocument,
} from "@/graphql/__generated__/graphql";
import { useMutation } from "@apollo/client/react";
import { useMemo } from "react";

export function useFolderOps(id: string | null) {
    const [deleteFolder] = useMutation(DeleteFolderDocument, {
        optimisticResponse: {
            __typename: "Mutation",
            deleteFolder: true,
        },
        update(cache, { data }, { context }) {
            if (data?.deleteFolder) {
                cache.evict({
                    id: context?.ref,
                });
            }
        },
    });

    const [deleteFile] = useMutation(DeleteFileDocument, {
        optimisticResponse: {
            __typename: "Mutation",
            deleteFile: true,
        },
        update(cache, { data }, { context }) {
            if (data?.deleteFile) {
                cache.evict({
                    id: context?.ref,
                });
            }
        },
    });

    const ops = useMemo(
        () => ({
            delete(refs: string[] = []) {
                if (refs.length === 0) return;
                refs.forEach((ref) => {
                    const [type, id] = ref.split(":");
                    if (type === "File")
                        return deleteFile({
                            variables: {
                                id,
                            },
                            context: {
                                ref,
                            },
                        });

                    if (type === "Folder")
                        return deleteFolder({
                            variables: {
                                id,
                            },
                            context: {
                                ref,
                            },
                        });
                });
            },
        }),
        [deleteFile, deleteFolder],
    );

    return ops;
}
