import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  /** Register */
  register: User;
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


export type MutationRegisterArgs = {
  RegisterData: LoginInput;
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
    & Pick<Message, 'id' | 'username' | 'message' | 'createdAt'>
  )> }
);

export type PostMsgMutationVariables = Exact<{
  msg: MessageInput;
}>;


export type PostMsgMutation = (
  { __typename?: 'Mutation' }
  & { postMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'username' | 'message' | 'createdAt'>
  ) }
);

export type GetSessionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSessionQuery = (
  { __typename?: 'Query' }
  & { getSession: (
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'userId' | 'expiresAt' | 'createdAt'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'userId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: LoginInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);


export const GetMessagesDocument = gql`
    query getMessages {
  getMessages {
    id
    username
    message
    createdAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const PostMsgDocument = gql`
    mutation postMsg($msg: MessageInput!) {
  postMessage(MessageInput: $msg) {
    id
    username
    message
    createdAt
  }
}
    `;
export type PostMsgMutationFn = Apollo.MutationFunction<PostMsgMutation, PostMsgMutationVariables>;

/**
 * __usePostMsgMutation__
 *
 * To run a mutation, you first call `usePostMsgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMsgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMsgMutation, { data, loading, error }] = usePostMsgMutation({
 *   variables: {
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function usePostMsgMutation(baseOptions?: Apollo.MutationHookOptions<PostMsgMutation, PostMsgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMsgMutation, PostMsgMutationVariables>(PostMsgDocument, options);
      }
export type PostMsgMutationHookResult = ReturnType<typeof usePostMsgMutation>;
export type PostMsgMutationResult = Apollo.MutationResult<PostMsgMutation>;
export type PostMsgMutationOptions = Apollo.BaseMutationOptions<PostMsgMutation, PostMsgMutationVariables>;
export const GetSessionDocument = gql`
    query getSession($id: String!) {
  getSession(id: $id) {
    id
    userId
    expiresAt
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(LoginData: $data) {
    id
    userId
    user {
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: LoginInput!) {
  register(RegisterData: $data) {
    id
    username
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;