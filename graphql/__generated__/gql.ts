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
    "query GetFile($id: UUID!) {\n  file(id: $id) {\n    ...FileFields\n  }\n}": typeof types.GetFileDocument,
    "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields @defer\n  }\n  files(folderId: $folderId) {\n    ...FileFields @defer\n  }\n}": typeof types.GetFolderContentsDocument,
    "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}": typeof types.GetFolderDocument,
    "query GetUser($id: UUID!) {\n  user(id: $id) {\n    ...UserFields @unmask\n  }\n}": typeof types.GetUserDocument,
    "query ItemAccessDetails($id: UUID!, $isFolder: Boolean = false, $isFile: Boolean = false) {\n  file(id: $id) @include(if: $isFile) {\n    ...FileFields\n  }\n  folder(id: $id) @include(if: $isFolder) {\n    ...FolderFields\n  }\n  filePermissionsByFileId(fileId: $id) @include(if: $isFile) {\n    ...FilePermissionFields\n  }\n  folderPermissionsByFolderId(folderId: $id) @include(if: $isFolder) {\n    ...FolderPermissionFields\n  }\n}": typeof types.ItemAccessDetailsDocument,
    "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}": typeof types.FileFieldsFragmentDoc,
    "fragment FilePermissionFields on FilePermission {\n  id\n  userId\n  fileId\n  role\n}": typeof types.FilePermissionFieldsFragmentDoc,
    "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}": typeof types.FolderFieldsFragmentDoc,
    "fragment FolderOrFileFields on FolderOrFile {\n  ...FolderFields @unmasked\n  ...FileFields @unmask\n}": typeof types.FolderOrFileFieldsFragmentDoc,
    "fragment FolderPermissionFields on FolderPermission {\n  id\n  userId\n  folderId\n  role\n}": typeof types.FolderPermissionFieldsFragmentDoc,
    "fragment UserFields on User {\n  id\n  email\n}": typeof types.UserFieldsFragmentDoc,
    "mutation ChangeFilePermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFilePermission(id: $id, permissionInput: {role: $role}) {\n    ...FilePermissionFields\n  }\n}\n\nmutation ChangeFolderPermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFolderPermission(id: $id, permissionInput: {role: $role}) {\n    ...FolderPermissionFields\n  }\n}": typeof types.ChangeFilePermissionRoleDocument,
    "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id)\n}": typeof types.DeleteFileDocument,
    "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id)\n}": typeof types.DeleteFolderDocument,
    "mutation UpdateFile($id: UUID!, $input: UpdateFileInput!) {\n  updateFile(id: $id, fileInput: $input) {\n    ...FileFields @unmask\n  }\n}": typeof types.UpdateFileDocument,
    "mutation UpdateFolder($id: UUID!, $input: UpdateFolderInput!) {\n  updateFolder(id: $id, folderInput: $input) {\n    ...FolderFields\n  }\n}": typeof types.UpdateFolderDocument,
};
const documents: Documents = {
    "query GetFile($id: UUID!) {\n  file(id: $id) {\n    ...FileFields\n  }\n}": types.GetFileDocument,
    "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields @defer\n  }\n  files(folderId: $folderId) {\n    ...FileFields @defer\n  }\n}": types.GetFolderContentsDocument,
    "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}": types.GetFolderDocument,
    "query GetUser($id: UUID!) {\n  user(id: $id) {\n    ...UserFields @unmask\n  }\n}": types.GetUserDocument,
    "query ItemAccessDetails($id: UUID!, $isFolder: Boolean = false, $isFile: Boolean = false) {\n  file(id: $id) @include(if: $isFile) {\n    ...FileFields\n  }\n  folder(id: $id) @include(if: $isFolder) {\n    ...FolderFields\n  }\n  filePermissionsByFileId(fileId: $id) @include(if: $isFile) {\n    ...FilePermissionFields\n  }\n  folderPermissionsByFolderId(folderId: $id) @include(if: $isFolder) {\n    ...FolderPermissionFields\n  }\n}": types.ItemAccessDetailsDocument,
    "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}": types.FileFieldsFragmentDoc,
    "fragment FilePermissionFields on FilePermission {\n  id\n  userId\n  fileId\n  role\n}": types.FilePermissionFieldsFragmentDoc,
    "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}": types.FolderFieldsFragmentDoc,
    "fragment FolderOrFileFields on FolderOrFile {\n  ...FolderFields @unmasked\n  ...FileFields @unmask\n}": types.FolderOrFileFieldsFragmentDoc,
    "fragment FolderPermissionFields on FolderPermission {\n  id\n  userId\n  folderId\n  role\n}": types.FolderPermissionFieldsFragmentDoc,
    "fragment UserFields on User {\n  id\n  email\n}": types.UserFieldsFragmentDoc,
    "mutation ChangeFilePermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFilePermission(id: $id, permissionInput: {role: $role}) {\n    ...FilePermissionFields\n  }\n}\n\nmutation ChangeFolderPermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFolderPermission(id: $id, permissionInput: {role: $role}) {\n    ...FolderPermissionFields\n  }\n}": types.ChangeFilePermissionRoleDocument,
    "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id)\n}": types.DeleteFileDocument,
    "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id)\n}": types.DeleteFolderDocument,
    "mutation UpdateFile($id: UUID!, $input: UpdateFileInput!) {\n  updateFile(id: $id, fileInput: $input) {\n    ...FileFields @unmask\n  }\n}": types.UpdateFileDocument,
    "mutation UpdateFolder($id: UUID!, $input: UpdateFolderInput!) {\n  updateFolder(id: $id, folderInput: $input) {\n    ...FolderFields\n  }\n}": types.UpdateFolderDocument,
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
export function graphql(source: "query GetFile($id: UUID!) {\n  file(id: $id) {\n    ...FileFields\n  }\n}"): (typeof documents)["query GetFile($id: UUID!) {\n  file(id: $id) {\n    ...FileFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields @defer\n  }\n  files(folderId: $folderId) {\n    ...FileFields @defer\n  }\n}"): (typeof documents)["query GetFolderContents($folderId: UUID = null) {\n  folders(folderId: $folderId) {\n    ...FolderFields @defer\n  }\n  files(folderId: $folderId) {\n    ...FileFields @defer\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}"): (typeof documents)["query GetFolder($id: UUID!) {\n  folder(id: $id) {\n    ...FolderFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUser($id: UUID!) {\n  user(id: $id) {\n    ...UserFields @unmask\n  }\n}"): (typeof documents)["query GetUser($id: UUID!) {\n  user(id: $id) {\n    ...UserFields @unmask\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ItemAccessDetails($id: UUID!, $isFolder: Boolean = false, $isFile: Boolean = false) {\n  file(id: $id) @include(if: $isFile) {\n    ...FileFields\n  }\n  folder(id: $id) @include(if: $isFolder) {\n    ...FolderFields\n  }\n  filePermissionsByFileId(fileId: $id) @include(if: $isFile) {\n    ...FilePermissionFields\n  }\n  folderPermissionsByFolderId(folderId: $id) @include(if: $isFolder) {\n    ...FolderPermissionFields\n  }\n}"): (typeof documents)["query ItemAccessDetails($id: UUID!, $isFolder: Boolean = false, $isFile: Boolean = false) {\n  file(id: $id) @include(if: $isFile) {\n    ...FileFields\n  }\n  folder(id: $id) @include(if: $isFolder) {\n    ...FolderFields\n  }\n  filePermissionsByFileId(fileId: $id) @include(if: $isFile) {\n    ...FilePermissionFields\n  }\n  folderPermissionsByFolderId(folderId: $id) @include(if: $isFolder) {\n    ...FolderPermissionFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment FileFields on File {\n  id\n  name\n  folderId\n  starred\n  ext\n  size\n  mimeType\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FilePermissionFields on FilePermission {\n  id\n  userId\n  fileId\n  role\n}"): (typeof documents)["fragment FilePermissionFields on FilePermission {\n  id\n  userId\n  fileId\n  role\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment FolderFields on Folder {\n  id\n  name\n  parentId\n  starred\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FolderOrFileFields on FolderOrFile {\n  ...FolderFields @unmasked\n  ...FileFields @unmask\n}"): (typeof documents)["fragment FolderOrFileFields on FolderOrFile {\n  ...FolderFields @unmasked\n  ...FileFields @unmask\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FolderPermissionFields on FolderPermission {\n  id\n  userId\n  folderId\n  role\n}"): (typeof documents)["fragment FolderPermissionFields on FolderPermission {\n  id\n  userId\n  folderId\n  role\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFields on User {\n  id\n  email\n}"): (typeof documents)["fragment UserFields on User {\n  id\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeFilePermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFilePermission(id: $id, permissionInput: {role: $role}) {\n    ...FilePermissionFields\n  }\n}\n\nmutation ChangeFolderPermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFolderPermission(id: $id, permissionInput: {role: $role}) {\n    ...FolderPermissionFields\n  }\n}"): (typeof documents)["mutation ChangeFilePermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFilePermission(id: $id, permissionInput: {role: $role}) {\n    ...FilePermissionFields\n  }\n}\n\nmutation ChangeFolderPermissionRole($id: UUID!, $role: RoleEnum!) {\n  updateFolderPermission(id: $id, permissionInput: {role: $role}) {\n    ...FolderPermissionFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id)\n}"): (typeof documents)["mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id)\n}"): (typeof documents)["mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateFile($id: UUID!, $input: UpdateFileInput!) {\n  updateFile(id: $id, fileInput: $input) {\n    ...FileFields @unmask\n  }\n}"): (typeof documents)["mutation UpdateFile($id: UUID!, $input: UpdateFileInput!) {\n  updateFile(id: $id, fileInput: $input) {\n    ...FileFields @unmask\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateFolder($id: UUID!, $input: UpdateFolderInput!) {\n  updateFolder(id: $id, folderInput: $input) {\n    ...FolderFields\n  }\n}"): (typeof documents)["mutation UpdateFolder($id: UUID!, $input: UpdateFolderInput!) {\n  updateFolder(id: $id, folderInput: $input) {\n    ...FolderFields\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;