import { graphql, useSubscription } from 'react-relay'
import { FC, useMemo } from 'react'
import { GraphQLSubscriptionConfig } from 'relay-runtime'
import { PostsSubscription } from './__generated__/PostsSubscription.graphql'

const feedbackLikeSubscription = graphql`
  subscription PostsSubscription {
    posts {
      mutationType
      post {
        id
      }
    }
  }
`

const usePostsSubscription = () => {
  const config: GraphQLSubscriptionConfig<PostsSubscription> = useMemo(
    () => ({
      subscription: feedbackLikeSubscription,
      onNext: (data) => {
        console.log('Got data from subscription', data)
      },
      updater: (store, data) => {
        if (data.posts.mutationType === 'CREATED') {
          const posts = store.get()
        }
      },
      variables: {},
    }),
    []
  )

  return useSubscription(config)
}

export const PostsSubscriber: FC = () => {
  usePostsSubscription()

  return null
}
