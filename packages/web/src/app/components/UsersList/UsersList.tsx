import { FC, Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { UsersList_AllUsersQuery } from './__generated__/UsersList_AllUsersQuery.graphql'
import { UserItem } from './UserItem'
import { FIRST_POSTS, UserPosts } from './UserPosts'
import { QueryListKey, useQueryKeys } from '../../GraphqlFetchKeyProvider'
import { T } from '../ui/T'
import { UserDraftsCount } from './UserDraftsCount'

export const UsersList: FC = () => {
  return (
    <div>
      <T color="100" size="h1" className="mb-2" block>
        Users
      </T>
      <Suspense fallback="Loading">
        <SmallErrorBoundary>
          <UsersContent />
        </SmallErrorBoundary>
      </Suspense>
    </div>
  )
}

const UsersContent: FC = () => {
  const { keys } = useQueryKeys()
  const fetchKey = keys[QueryListKey.Users]

  const { allUsers } = useLazyLoadQuery<UsersList_AllUsersQuery>(
    graphql`
      query UsersList_AllUsersQuery($first: Int!) {
        allUsers {
          id
          ...UserItem_user
          ...UserDraftsCount_user
          ...UserPosts_user @arguments(first: $first)
        }
      }
    `,
    { first: FIRST_POSTS },
    { fetchKey }
  )

  if (allUsers.length === 0) return <>No users</>

  return (
    <div className="flex flex-col gap-2">
      {allUsers.map((u) => (
        <div
          key={u.id}
          className="rounded-lg bg-black/5 p-10 flex flex-col gap-3"
        >
          <UserItem user$key={u} />
          <UserPosts user$key={u} />
          <UserDraftsCount user$key={u} />
        </div>
      ))}
    </div>
  )
}
