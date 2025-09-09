export {};

declare global {
    type UUID = string;
    type __ref = `${"Folder" | "File"}:${string}`;
}
