import { isReactNativeFile } from "@/utils";
import {
    ApolloLink,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import api from "./api";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import store from "@/stores";
import { Defer20220824Handler } from "@apollo/client/incremental";

const uploadLink = new UploadHttpLink({
    isExtractableFile: isReactNativeFile,
    uri: api.defaults.baseURL?.replace(
        /\/api\/.*$/,
        "/graphql",
    ) as string,
});

const httpLink = new HttpLink({
    uri: api.defaults.baseURL?.replace(
        /\/api\/.*$/,
        "/graphql",
    ) as string,
    fetchOptions: {
        reactNative: {
            textStreaming: true,
        },
    },
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
        retryIf: (error) => !!(error as any).networkError,
    },
    delay: {
        initial: 300,
        jitter: true,
        max: Infinity,
    },
});

const cache = new InMemoryCache({
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
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([authLink, httpLink]),
    incrementalHandler: new Defer20220824Handler(),
});

export default client;
