import { UseMutationConfig, graphql, useMutation } from 'react-relay'
import { useTogglePublishPostMutation } from './__generated__/useTogglePublishPostMutation.graphql'
import { useCallback } from 'react'

export const useTogglePublishPost = (
  defaultConfig?: UseMutationConfig<useTogglePublishPostMutation>
) => {
  const [commit, isLoading] = useMutation<useTogglePublishPostMutation>(
    graphql`
      mutation useTogglePublishPostMutation($id: ID!) {
        togglePublishPost(id: $id) {
          id
          published
        }
      }
    `
  )

  const togglePublish = useCallback(
    (config: UseMutationConfig<useTogglePublishPostMutation>) => {
      // Can define custom behavior for particular mutation
      // like refetch some queries or marking some data as stale
      return commit({ ...defaultConfig, ...config })
    },
    [commit, defaultConfig]
  )

  return {
    togglePublish,
    isLoading,
  }
}
