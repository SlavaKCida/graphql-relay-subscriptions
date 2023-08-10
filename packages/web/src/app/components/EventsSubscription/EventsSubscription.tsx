import { graphql, useSubscription } from 'react-relay'
import { FC, useCallback, useMemo } from 'react'
import { GraphQLSubscriptionConfig } from 'relay-runtime'
import { EventsSubscription } from './__generated__/EventsSubscription.graphql'
import { QueryListKey, useQueryKeys } from '../../GraphqlFetchKeyProvider'

const postUpdatesSubscription = graphql`
  subscription EventsSubscription {
    postUpdates {
      mutationType
      node {
        id
        author {
          id
          ...UserDraftsCount_user
        }
        ...PostInfo_post
        ...PostAuthor_post
      }
    }
  }
`

const usePostEventsSubscription = ({ onUpdate }: { onUpdate: () => void }) => {
  const config: GraphQLSubscriptionConfig<EventsSubscription> = useMemo(
    () => ({
      subscription: postUpdatesSubscription,
      onNext: (data) => {
        console.log('Got data from posts subscription', data?.postUpdates)
      },
      updater: (store, { postUpdates }) => {
        if (!postUpdates.node) return

        if (postUpdates.mutationType === 'CREATED') {
          store.get(postUpdates.node.author.id)?.invalidateRecord()
          onUpdate()
        }
      },
      variables: {},
      refetchQueries: [],
    }),
    [onUpdate]
  )

  return useSubscription(config)
}

export const EventsSubscriber: FC = () => {
  const { updateKey } = useQueryKeys()

  const update = useCallback(() => {
    updateKey(QueryListKey.Posts)
  }, [updateKey])

  usePostEventsSubscription({ onUpdate: update })

  return null
}
