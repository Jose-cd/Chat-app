import { GraphQLClient } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  username: Scalars['String'];
  message: Scalars['String'];
  createdAt: Scalars['String'];
};

export type MessageInput = {
  msg: Scalars['String'];
  user: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Post a Message */
  postMessage: Message;
  /** Login using a username and password */
  login: UserSession;
  /** log out of the current session */
  logout: Scalars['Boolean'];
};


export type MutationPostMessageArgs = {
  MessageInput: MessageInput;
};


export type MutationLoginArgs = {
  LoginData: LoginInput;
};


export type MutationLogoutArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns list of messages */
  getMessages: Array<Message>;
  /** Gets current user session & information */
  getSession: UserSession;
};


export type QueryGetSessionArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessages: Message;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserSession = {
  __typename?: 'UserSession';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'username' | 'message'>
  )> }
);


export const GetMessagesDocument = `
    query getMessages {
  getMessages {
    username
    message
  }
}
    `;
export const useGetMessagesQuery = <
      TData = GetMessagesQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetMessagesQueryVariables, 
      options?: UseQueryOptions<GetMessagesQuery, TError, TData>
    ) => 
    useQuery<GetMessagesQuery, TError, TData>(
      ['getMessages', variables],
      fetcher<GetMessagesQuery, GetMessagesQueryVariables>(client, GetMessagesDocument, variables),
      options
    );