import { FC, Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { UsersList_AllUsersQuery } from './__generated__/UsersList_AllUsersQuery.graphql'
import { UserItem } from './UserItem'
import { FIRST_POSTS, UserPosts } from './UserPosts'

export const UsersList: FC = () => {
  return (
    <div>
      <p className="text-3xl text-black/20 mb-4">Users</p>
      <Suspense fallback="Loading">
        <SmallErrorBoundary>
          <UsersContent />
        </SmallErrorBoundary>
      </Suspense>
    </div>
  )
}

const UsersContent: FC = () => {
  const { allUsers } = useLazyLoadQuery<UsersList_AllUsersQuery>(
    graphql`
      query UsersList_AllUsersQuery($first: Int!) {
        allUsers {
          id
          ...UserItem_user
          ...UserPosts_user @arguments(first: $first)
        }
      }
    `,
    { first: FIRST_POSTS },
    { fetchPolicy: 'store-and-network' }
  )

  if (allUsers.length === 0) return <>'No users'</>

  return (
    <div className="flex flex-col gap-2">
      {allUsers.map((u) => (
        <div
          key={u.id}
          className="rounded-lg bg-black/5 p-10 flex flex-col gap-3"
        >
          <UserItem user$key={u} />
          <UserPosts user$key={u} />
        </div>
      ))}
    </div>
  )
}
