import { graphql } from "@/gql"

export const getTweetsQuery = graphql(
    `#graphql
    query getTweets {
        getTweets {
            id
            content
            imageUrl
            author {
                id
                firstName
                lastName
                profileImageUrl
            }
        }
    },
`)

export const getTweetQuery = graphql(
    `#graphql
    query getTweet($id: ID!) {
        getTweet(id: $id) {
            id
            content
            imageUrl
            author {
                id
                firstName
                lastName
                profileImageUrl
            }
        }
    },
`)

export const getSignedUrlForTweetQuery = graphql(
    `#graphql
    query getSignedUrlForTweet($imageType: String!) {
        getSignedUrlForTweet(imageType: $imageType)
    }
   `)





