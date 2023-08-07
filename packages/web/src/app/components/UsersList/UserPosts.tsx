import {
  graphql,
  useRefetchableFragment,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { UserPosts_user$key } from './__generated__/UserPosts_user.graphql'
import { FC, useCallback } from 'react'
import { PostInfo } from '../PostsList/PostInfo'

type UserPostsProps = {
  user$key: UserPosts_user$key
  firstPosts?: number
}

export const FIRST_POSTS = 2

export const UserPosts: FC<UserPostsProps> = ({ user$key }) => {
  const [user, refetch] = useRefetchableFragment(
    graphql`
      fragment UserPosts_user on User
      @refetchable(queryName: "UserPosts_postsRefetchQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }) {
        id
        name
        posts(first: $first) {
          id
          ...PostInfo_post
        }
      }
    `,
    user$key
  )

  const refetchData = useCallback(() => {
    refetch(user$key)
  }, [user$key, refetch])
  useSubscribeToInvalidationState([user.id], refetchData)

  if (!user.posts.length) return null

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs">Last posts by {user.name}</p>
      {user.posts.map((p) => (
        <div key={p.id} className="rounded bg-white p-3">
          <PostInfo post$key={p} />
        </div>
      ))}
    </div>
  )
}
