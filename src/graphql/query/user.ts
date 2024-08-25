import { graphql } from "../../gql"

export const veryUserGoogleTokenQuery = graphql(
    `#graphql
    query verifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`
)