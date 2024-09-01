import { graphql } from "@/gql"

export const createTweetMutation = graphql(
    `#graphql
    mutation createTweet($payload: CreateTweetInput) {
        createTweet(payload: $payload) {
            id
        }
    }
    `
)

