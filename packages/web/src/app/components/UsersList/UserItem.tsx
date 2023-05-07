import { graphql, useFragment } from 'react-relay'
import { UserItem_user$key } from './__generated__/UserItem_user.graphql'
import { FC } from 'react'

type UserItemProps = {
  user$key: UserItem_user$key
}

export const UserItem: FC<UserItemProps> = ({ user$key }) => {
  const user = useFragment(
    graphql`
      fragment UserItem_user on User {
        id
        email
        name
      }
    `,
    user$key
  )
  return (
    <div>
      <p className="font-semibold text-md">{user.name}</p>
      <p className="text-stone-500 text-sm">{user.email}</p>
    </div>
  )
}
