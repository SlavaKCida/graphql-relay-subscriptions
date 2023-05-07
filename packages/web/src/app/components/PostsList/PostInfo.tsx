import { FC } from 'react'
import { graphql, useFragment } from 'react-relay'
import { PostInfo_post$key } from './__generated__/PostInfo_post.graphql'
import { format } from 'date-fns'

type PostInfoProps = {
  post$key: PostInfo_post$key
}

export const PostInfo: FC<PostInfoProps> = ({ post$key }) => {
  const post = useFragment(
    graphql`
      fragment PostInfo_post on Post {
        id
        content
        title
        createdAt
        published
      }
    `,
    post$key
  )

  return (
    <>
      <p className="font-semibold mb-1">
        {post.published ? '😳' : '😵‍💫'} {post.title}{' '}
        <span className="text-xs text-stone-400 font-normal inline-block pl-1">
          {format(new Date(post.createdAt), 'hh:mm, do MMM')}
        </span>
      </p>
      <p className="text-sm">{post.content || 'No content for this post'}</p>
    </>
  )
}
