import { graphql, useFragment } from 'react-relay'
import { UserDraftsCount_user$key } from './__generated__/UserDraftsCount_user.graphql'
import { FC } from 'react'

type UserDraftsCountProps = {
  user$key: UserDraftsCount_user$key
}

export const UserDraftsCount: FC<UserDraftsCountProps> = ({ user$key }) => {
  const user = useFragment(
    graphql`
      fragment UserDraftsCount_user on User {
        draftsCount
      }
    `,
    user$key
  )
  return (
    <div>
      <p className="font-semibold text-md">
        User drafts count {user.draftsCount}
      </p>
    </div>
  )
}
