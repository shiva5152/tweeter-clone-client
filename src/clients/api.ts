import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

const getToken = () => {
    if (isClient) {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : "";
    }
    return "";
};

export const graphqlClient = new GraphQLClient('http://localhost:4000/graphql', {
    headers: {
        Authorization: getToken()
    }
});