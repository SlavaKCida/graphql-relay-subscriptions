// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { PostsList } from './components/PostsList/PostsList'
import { PostsSubscriber } from './components/PostsSubscription/PostsSubscription'
import { UsersList } from './components/UsersList/UsersList'

import './index.css'

export function App() {
  return (
    <div className="flex-1 px-10 py-20">
      <PostsSubscriber />
      <div className="grid grid-cols-2 gap-4">
        <UsersList />
        <PostsList />
      </div>
    </div>
  )
}

export default App
