import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "@/clients/api"
import { getTweetsQuery, getTweetQuery } from "@/graphql/query/tweet"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { CreateTweetInput } from "@/gql/graphql"
import { toast } from "react-hot-toast"

export const useTweets = () => {
    const query = useQuery({
        queryKey: ["tweets"],
        queryFn: () => graphqlClient.request(getTweetsQuery)
    })

    return { ...query, tweets: query.data?.getTweets };
}

export const useTweet = (id: string) => {
    const query = useQuery({
        queryKey: ["tweet", id],
        queryFn: () => graphqlClient.request(getTweetQuery, { id })
    })

    return { ...query, tweet: query.data?.getTweet };
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({


        mutationFn: (payload: CreateTweetInput) => graphqlClient.request(createTweetMutation, { payload }),
        onMutate: (payload) => toast.loading(`Creating tweet`, { id: "1" }),
        onSuccess: async (payload) => {
            await queryClient.invalidateQueries({ queryKey: ["tweets"] })
            toast.success("Tweet created successfully")

            toast.success('created', { id: '1' })
        },

    })

    return mutation
}


