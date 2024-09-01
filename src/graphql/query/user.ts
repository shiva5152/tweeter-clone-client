import { graphql } from "../../gql"

export const veryUserGoogleTokenQuery = graphql(
    `#graphql
    query verifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }

`
)

export const getCurrentUserQuery = graphql(
    `#graphql
    query getCurrentUser {
        getCurrentUser {
            id
            email
            firstName
            lastName
            profileImageUrl,
            tweets {
                id
                content
                author {
                    firstName
                    lastName
                    profileImageUrl
                }
            }
        }
    }
`
)

export const getUserByIdQuery = graphql(
    `#graphql
    query getUserById($id: String!) {
        getUserById(id: $id) {
           id
            email
            firstName
            lastName
            profileImageUrl,
            tweets {
                id
                content
                author {
                    firstName
                    lastName
                    profileImageUrl
                }
            }
        }
    }
`
)