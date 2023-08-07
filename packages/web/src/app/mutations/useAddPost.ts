import { UseMutationConfig, graphql, useMutation } from 'react-relay'
import { useAddPostMutation } from './__generated__/useAddPostMutation.graphql'
import { useCallback } from 'react'

export const useAddPost = (
  defaultConfig?: UseMutationConfig<useAddPostMutation>
) => {
  const [commit, isLoading] = useMutation<useAddPostMutation>(
    graphql`
      mutation useAddPostMutation(
        $authorEmail: String!
        $data: PostCreateInput!
      ) {
        createDraft(authorEmail: $authorEmail, data: $data) {
          id
          ...PostInfo_post
          ...PostAuthor_post
        }
      }
    `
  )

  const addPost = useCallback(
    (config: UseMutationConfig<useAddPostMutation>) => {
      // Can define custom behavior for particular mutation
      // like refetch some queries or marking some data as stale
      return commit({ ...defaultConfig, ...config })
    },
    [commit, defaultConfig]
  )

  return {
    addPost,
    isLoading,
  }
}
