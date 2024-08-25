import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient('http://localhost:4000/graphql', {
    headers: {
        Authorization: isClient ? localStorage.getItem('token') || "" : ""
    }
});