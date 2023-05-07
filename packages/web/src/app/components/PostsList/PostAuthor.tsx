import { FC } from 'react'
import { graphql, useFragment } from 'react-relay'
import { PostAuthor_post$key } from './__generated__/PostAuthor_post.graphql'

type PostAuthorProps = {
  post$key: PostAuthor_post$key
}

export const PostAuthor: FC<PostAuthorProps> = ({ post$key }) => {
  const post = useFragment(
    graphql`
      fragment PostAuthor_post on Post {
        author {
          name
          email
        }
      }
    `,
    post$key
  )

  return (
    <p className="mt-2 text-xs text-stone-300">
      by {post.author.name} ({post.author.email})
    </p>
  )
}
