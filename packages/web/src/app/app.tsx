// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { PostsList } from './components/PostsList/PostsList'
import { EventsSubscriber } from './components/EventsSubscription/EventsSubscription'
import { UsersList } from './components/UsersList/UsersList'

import './index.css'
import { QueryKeyContextProvider } from './GraphqlFetchKeyProvider'
import { AddPost } from './components/AddPost/AddPost'
import { Divider } from './components/ui/Divider'

export function App() {
  return (
    <QueryKeyContextProvider>
      <EventsSubscriber />
      <div className="flex-1 px-10 py-20 flex flex-col gap-16">
        <AddPost />
        <Divider />
        <div className="grid grid-cols-3 gap-16">
          <div>
            <UsersList />
          </div>
          <div className="col-span-2">
            <PostsList />
          </div>
        </div>
      </div>
    </QueryKeyContextProvider>
  )
}

export default App
