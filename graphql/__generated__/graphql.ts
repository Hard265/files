/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum ContentType {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type CreateFileInput = {
  file: Scalars['Upload']['input'];
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateFilePermissionInput = {
  fileId: Scalars['UUID']['input'];
  role: RoleEnum;
  userId: Scalars['UUID']['input'];
};

export type CreateFolderInput = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateFolderPermissionInput = {
  folderId: Scalars['UUID']['input'];
  role: RoleEnum;
  userId: Scalars['UUID']['input'];
};

export type CreateLinkInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permission: LinkPermission;
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  ext: Scalars['String']['output'];
  file: Scalars['String']['output'];
  folderId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  starred: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FilePermission = {
  __typename?: 'FilePermission';
  fileId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  role: RoleEnum;
  userId: Scalars['UUID']['output'];
};

export type FilterInput = {
  createdAtAfter?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtBefore?: InputMaybe<Scalars['DateTime']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  sharedByMe?: InputMaybe<Scalars['Boolean']['input']>;
  sharedWithMe?: InputMaybe<Scalars['Boolean']['input']>;
  sizeGreaterThan?: InputMaybe<Scalars['Int']['input']>;
  sizeLessThan?: InputMaybe<Scalars['Int']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<ContentType>;
  updatedAtAfter?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAtBefore?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  starred: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FolderOrFile = File | Folder;

export type FolderPermission = {
  __typename?: 'FolderPermission';
  folderId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  role: RoleEnum;
  userId: Scalars['UUID']['output'];
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['UUID']['output']>;
  folderId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  password?: Maybe<Scalars['String']['output']>;
  permisssion: LinkPermission;
  token: Scalars['String']['output'];
  userId: Scalars['UUID']['output'];
};

export enum LinkPermission {
  Edit = 'edit',
  View = 'view'
}

export type Mutation = {
  __typename?: 'Mutation';
  createFile: File;
  createFilePermission: FilePermission;
  createFolder: Folder;
  createFolderPermission: FolderPermission;
  createLink: Link;
  deleteFile: Scalars['Boolean']['output'];
  deleteFilePermission: Scalars['Boolean']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  deleteFolderPermission: Scalars['Boolean']['output'];
  deleteLink: Scalars['Boolean']['output'];
  updateFile?: Maybe<File>;
  updateFilePermission?: Maybe<FilePermission>;
  updateFolder?: Maybe<Folder>;
  updateFolderPermission?: Maybe<FolderPermission>;
  updateLink?: Maybe<Link>;
};


export type MutationCreateFileArgs = {
  fileInput: CreateFileInput;
};


export type MutationCreateFilePermissionArgs = {
  permissionInput: CreateFilePermissionInput;
};


export type MutationCreateFolderArgs = {
  folderInput: CreateFolderInput;
};


export type MutationCreateFolderPermissionArgs = {
  permissionInput: CreateFolderPermissionInput;
};


export type MutationCreateLinkArgs = {
  linkInput: CreateLinkInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFilePermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFolderPermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpdateFileArgs = {
  fileInput: UpdateFileInput;
  id: Scalars['UUID']['input'];
};


export type MutationUpdateFilePermissionArgs = {
  id: Scalars['UUID']['input'];
  permissionInput: UpdateFilePermissionInput;
};


export type MutationUpdateFolderArgs = {
  folderInput: UpdateFolderInput;
  id: Scalars['UUID']['input'];
};


export type MutationUpdateFolderPermissionArgs = {
  id: Scalars['UUID']['input'];
  permissionInput: UpdateFolderPermissionInput;
};


export type MutationUpdateLinkArgs = {
  id: Scalars['UUID']['input'];
  linkInput: UpdateLinkInput;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  file?: Maybe<File>;
  filePermission?: Maybe<FilePermission>;
  filePermissions: Array<FilePermission>;
  files: Array<File>;
  folder?: Maybe<Folder>;
  folderPermission?: Maybe<FolderPermission>;
  folderPermissions: Array<FolderPermission>;
  folders: Array<Folder>;
  hello: Scalars['String']['output'];
  link?: Maybe<Link>;
  links: Array<Link>;
  search: SearchResult;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryFileArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFilePermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFilePermissionsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};


export type QueryFilesArgs = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};


export type QueryFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFolderPermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFolderPermissionsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};


export type QueryFoldersArgs = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};


export type QueryLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryLinksArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};


export type QuerySearchArgs = {
  filter?: InputMaybe<FilterInput>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  query: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};

export enum RoleEnum {
  Editor = 'editor',
  Owner = 'owner',
  Viewer = 'viewer'
}

export type SearchResult = {
  __typename?: 'SearchResult';
  files: Array<File>;
  folders: Array<Folder>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  direction?: SortDirection;
  field: Scalars['String']['input'];
};

export type UpdateFileInput = {
  ext?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFilePermissionInput = {
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<RoleEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateFolderInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFolderPermissionInput = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<RoleEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateLinkInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<LinkPermission>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
};

export type GetFolderContentsQueryVariables = Exact<{
  folderId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetFolderContentsQuery = { __typename?: 'Query', folders: Array<{ __typename?: 'Folder' } & (
    { __typename?: 'Folder' }
    & { ' $fragmentRefs'?: { 'FolderFieldsFragment': Incremental<FolderFieldsFragment> } }
  )>, files: Array<{ __typename?: 'File' } & (
    { __typename?: 'File' }
    & { ' $fragmentRefs'?: { 'FileFieldsFragment': Incremental<FileFieldsFragment> } }
  )> };

export type GetFolderQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderQuery = { __typename?: 'Query', folder?: (
    { __typename?: 'Folder' }
    & { ' $fragmentRefs'?: { 'FolderFieldsFragment': FolderFieldsFragment } }
  ) | null };

export type FileFieldsFragment = { __typename?: 'File', id: any, name: string, folderId?: any | null, starred: boolean, ext: string, size: number, mimeType: string, updatedAt: any, createdAt: any } & { ' $fragmentName'?: 'FileFieldsFragment' };

export type FolderFieldsFragment = { __typename?: 'Folder', id: any, name: string, parentId?: any | null, starred: boolean, updatedAt: any, createdAt: any } & { ' $fragmentName'?: 'FolderFieldsFragment' };

type FolderOrFileFields_File_Fragment = (
  { __typename?: 'File' }
  & { ' $fragmentRefs'?: { 'FileFieldsFragment': FileFieldsFragment } }
) & { ' $fragmentName'?: 'FolderOrFileFields_File_Fragment' };

type FolderOrFileFields_Folder_Fragment = (
  { __typename?: 'Folder' }
  & { ' $fragmentRefs'?: { 'FolderFieldsFragment': FolderFieldsFragment } }
) & { ' $fragmentName'?: 'FolderOrFileFields_Folder_Fragment' };

export type FolderOrFileFieldsFragment = FolderOrFileFields_File_Fragment | FolderOrFileFields_Folder_Fragment;

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder: boolean };

export const FolderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<FolderFieldsFragment, unknown>;
export const FileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<FileFieldsFragment, unknown>;
export const FolderOrFileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderOrFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FolderOrFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"unmask"}}]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileFields"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"unmask"}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<FolderOrFileFieldsFragment, unknown>;
export const GetFolderContentsDocument = {"__meta__":{"deferredFields":{"FolderFields":["id","name","parentId","starred","updatedAt","createdAt"],"FileFields":["id","name","folderId","starred","ext","size","mimeType","updatedAt","createdAt"]}},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}},"defaultValue":{"kind":"NullValue"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"defer"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"files"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileFields"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"defer"}}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetFolderContentsQuery, GetFolderContentsQueryVariables>;
export const GetFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetFolderQuery, GetFolderQueryVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;