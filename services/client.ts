import { isReactNativeFile } from "@/utils";
import {
    ApolloLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import api from "./api";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"
import store from "@/stores";
import Folder from "@/pages/Folder";

const httpLink = new UploadHttpLink({
    isExtractableFile: isReactNativeFile,
    uri: api.defaults.baseURL?.replace(
        /\/api\/.*$/,
        "/graphql",
    ) as string,
});

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...store.auth.authorizationHeader,
        },
    }));
    return forward(operation);
});

const retryLink = new RetryLink({
    attempts: {
        max: 5,
        retryIf: (error) => !!error.networkError,
    },
    delay: {
        initial: 300,
        jitter: true,
        max: Infinity,
    },
});

const client = new ApolloClient({
    cache: new InMemoryCache({
        possibleTypes: {
            FolderOrFile: ["Folder", "File"],
        },
    }).restore({
        "Folder:null": {
            __typename: "Folder",
            id: "null",
            name: "Home",
            createdAt: "",
            updatedAt: "",
            starred: false,
            parentId: null,
        },
    }),
    link: ApolloLink.from([retryLink, authLink, httpLink]),
});

export default client;
