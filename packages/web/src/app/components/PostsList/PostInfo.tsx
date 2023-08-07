import { FC, useCallback } from 'react'
import {
  graphql,
  useRefetchableFragment,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { PostInfo_post$key } from './__generated__/PostInfo_post.graphql'
import { format } from 'date-fns'
import { useTogglePublishPost } from '../../mutations/useTogglePublishPost'
import { T } from '../ui/T'

type PostInfoProps = {
  post$key: PostInfo_post$key
}

export const PostInfo: FC<PostInfoProps> = ({ post$key }) => {
  const { togglePublish } = useTogglePublishPost()
  const [post, refetch] = useRefetchableFragment(
    graphql`
      fragment PostInfo_post on Post
      @refetchable(queryName: "PostInfo_postRefetchQuery") {
        id
        content
        title
        createdAt
        published
      }
    `,
    post$key
  )

  const refetchData = useCallback(() => {
    refetch(post$key)
  }, [post$key, refetch])
  useSubscribeToInvalidationState([post.id], refetchData)

  return (
    <>
      <div className="mb-1">
        <T size="small" bold>
          {post.title}
        </T>
        <T size="xsmall" color="400" className="pl-2">
          {format(new Date(post.createdAt), 'hh:mm, do MMM')}
        </T>
        <T
          onClick={() => togglePublish({ variables: { id: post.id } })}
          size="xsmall"
          color="400"
          className="ml-2 cursor-pointer hover:text-black"
        >
          {post.published ? '😳 – published' : '😵‍💫 – hidden'}
        </T>
      </div>
      <T>{post.content || 'No content for this post'}</T>
    </>
  )
}
