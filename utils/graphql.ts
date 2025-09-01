import { ExtractableFileMatcher } from "apollo-upload-client/createUploadLink.mjs";
import isExtractableFile, {
    ExtractableFile,
} from "extract-files/isExtractableFile.mjs";

interface ReactNativeFileParams {
    uri: string;
    name: string;
    type?: string;
}

export class ReactNativeFile {
    uri: string;
    name: string;
    type?: string;

    constructor({ uri, name, type }: ReactNativeFileParams) {
        this.uri = uri;
        this.name = name;
        this.type = type;
    }
}

export const isReactNativeFile: ExtractableFileMatcher = (
    value,
): value is ReactNativeFile | ExtractableFile => {
    if (value instanceof ReactNativeFile) {
        return true;
    }
    return isExtractableFile(value);
};
