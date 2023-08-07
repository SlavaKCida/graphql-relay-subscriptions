import { FC } from 'react'
import { graphql, useFragment } from 'react-relay'
import { PostAuthor_post$key } from './__generated__/PostAuthor_post.graphql'
import { Avatar } from '../ui/Avatar'

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
    <p className="mt-2 text-xs text-stone-500">
      <div className="flex items-center inline">
        <Avatar className="mr-1" size="sm" name={post.author.name || ''} />{' '}
        {post.author.name} ({post.author.email})
      </div>
    </p>
  )
}
