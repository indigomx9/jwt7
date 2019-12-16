type Maybe<T> = T | null;
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type LoginResponse = {
  accessToken: Scalars['String'],
  user: User,
};

export type Mutation = {
  register: Scalars['Boolean'],
  revokeRefreshTokensForUser: Scalars['Boolean'],
  login: LoginResponse,
  logout: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};

export type Query = {
  hello: Scalars['String'],
  bye: Scalars['String'],
  users: Array<User>,
  me?: Maybe<User>,
};

export type User = {
  id: Scalars['Int'],
  email: Scalars['String'],
};

export type ByeQueryVariables = {};


export type ByeQuery = ({ __typename?: 'Query' } & Pick<Query, 'bye'>);

export type HelloQueryVariables = {};


export type HelloQuery = ({ __typename?: 'Query' } & Pick<Query, 'hello'>);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = ({ __typename?: 'Mutation' } & { login: ({ __typename?: 'LoginResponse' } & Pick<LoginResponse, 'accessToken'> & { user: ({ __typename?: 'User' } & Pick<User, 'id' | 'email'>) }) });

export type LogoutMutationVariables = {};


export type LogoutMutation = ({ __typename?: 'Mutation' } & Pick<Mutation, 'logout'>);

export type MeQueryVariables = {};


export type MeQuery = ({ __typename?: 'Query' } & { me: Maybe<({ __typename?: 'User' } & Pick<User, 'id' | 'email'>)> });

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = ({ __typename?: 'Mutation' } & Pick<Mutation, 'register'>);

export type UsersQueryVariables = {};


export type UsersQuery = ({ __typename?: 'Query' } & { users: Array<({ __typename?: 'User' } & Pick<User, 'id' | 'email'>)> });


import gql from 'graphql-tag';
import * as ReactApolloHooks from '@apollo/react-hooks';

export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

export function useByeQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<ByeQueryVariables>) {
  return ReactApolloHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<HelloQueryVariables>) {
  return ReactApolloHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;

export function useLoginMutation(baseOptions?: ReactApolloHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation(baseOptions?: ReactApolloHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

export function useMeQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;

export function useRegisterMutation(baseOptions?: ReactApolloHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
  return ReactApolloHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;

export function useUsersQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<UsersQueryVariables>) {
  return ReactApolloHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
};