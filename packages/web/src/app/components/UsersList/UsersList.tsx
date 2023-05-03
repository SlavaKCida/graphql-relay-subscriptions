import { FC, Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { UsersList_AllUsersQuery } from './__generated__/UsersList_AllUsersQuery.graphql'

export const UsersList: FC = () => {
  return (
    <div>
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
      query UsersList_AllUsersQuery {
        allUsers {
          id
          email
          name
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' }
  )

  if (allUsers.length === 0) return <>'No users'</>

  return (
    <>
      {allUsers.map((u) => (
        <div key={u.id}>{u.email}</div>
      ))}
    </>
  )
}
