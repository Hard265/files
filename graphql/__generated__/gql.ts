/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields\n  }\n  files(folderId: $folderId) {\n    ...FileFields\n  }\n}": typeof types.GetFolderContentsDocument,
    "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}": typeof types.GetFolderDocument,
    "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}": typeof types.FileFieldsFragmentDoc,
    "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}": typeof types.FolderFieldsFragmentDoc,
};
const documents: Documents = {
    "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields\n  }\n  files(folderId: $folderId) {\n    ...FileFields\n  }\n}": types.GetFolderContentsDocument,
    "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}": types.GetFolderDocument,
    "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}": types.FileFieldsFragmentDoc,
    "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}": types.FolderFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields\n  }\n  files(folderId: $folderId) {\n    ...FileFields\n  }\n}"): (typeof documents)["query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields\n  }\n  files(folderId: $folderId) {\n    ...FileFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}"): (typeof documents)["query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;