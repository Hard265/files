import {
    DeleteFileDocument,
    DeleteFolderDocument,
    FileFieldsFragmentDoc,
    FolderFieldsFragmentDoc,
    UpdateFileDocument,
    UpdateFolderDocument,
} from "@/graphql/__generated__/graphql";
import { useMutation } from "@apollo/client/react";
import { useMemo } from "react";

export function useFolderOps(id: string | null) {
    const [updateFile] = useMutation(UpdateFileDocument, {
        update(cache, { data }, { variables, context }) {
            if (!data?.updateFile) return;

            cache.writeFragment({
                id: context?.ref,
                fragment: FileFieldsFragmentDoc,
                data: {
                    ...data.updateFile,
                },
            });
        },
        onError(error) {
            alert(error.message);
        }
    });
    const [updateFolder] = useMutation(UpdateFolderDocument, {
        update(cache, { data }, { variables, context }) {
            if (!data?.updateFolder) return;

            cache.writeFragment({
                id: context?.ref,
                fragment: FolderFieldsFragmentDoc,
                data: {
                    ...data.updateFolder,
                },
            });
        },
    });
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
            delete(refs: __ref[] = []) {
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
            rename: (ref: __ref, name: string) => {
                const [type, id] = ref.split(":");
                if (type === "File")
                    return updateFile({
                        variables: {
                            id,
                            input: {
                                name,
                            },
                        },
                        context: {
                            ref,
                        },
                    });

                if (type === "Folder")
                    return updateFolder({
                        variables: {
                            id,
                            input: {
                                name,
                            },
                        },
                        context: {
                            ref,
                        },
                    });
            },
            star: (refs: __ref[] = [], isStarred: boolean) => {
                if (refs.length === 0) return;
                refs.forEach((ref) => {
                    const [type, id] = ref.split(":");
                    if (type === "File")
                        return updateFile({
                            variables: {
                                id,
                                input: {
                                    starred: isStarred,
                                },
                            },
                            context: {
                                ref,
                            },
                        });

                    if (type === "Folder")
                        return updateFolder({
                            variables: {
                                id,
                                input: {
                                    starred: isStarred,
                                },
                            },
                            context: {
                                ref,
                            },
                        });
                });
            },
        }),
        [deleteFile, deleteFolder, updateFile, updateFolder],
    );

    return ops;
}
