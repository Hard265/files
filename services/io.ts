import api from "./api";

export function upload(folderId: string|null, file: null){
    api.post("/upload", {
        folderId,
        file
    });
}