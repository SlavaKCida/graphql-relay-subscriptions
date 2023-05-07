// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { PostsList } from './components/PostsList/PostsList'
import { EventsSubscriber } from './components/EventsSubscription/EventsSubscription'
import { UsersList } from './components/UsersList/UsersList'

import './index.css'
import { QueryKeyContextProvider } from './GraphqlFetchKeyProvider'

export function App() {
  return (
    <QueryKeyContextProvider>
      <div className="flex-1 px-10 py-20">
        <EventsSubscriber />
        <div className="grid grid-cols-2 gap-4">
          <UsersList />
          <PostsList />
        </div>
      </div>
    </QueryKeyContextProvider>
  )
}

export default App
