import { FC, Suspense, useEffect, useRef } from 'react'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { PostInfo } from './PostInfo'
import { PostsList_PostsQuery } from './__generated__/PostsList_PostsQuery.graphql'
import { PostsList_Fragment_Query$data } from './__generated__/PostsList_Fragment_Query.graphql'
import { PostAuthor } from './PostAuthor'
import { QueryListKey, useQueryKeys } from '../../GraphqlFetchKeyProvider'
import { T } from '../ui/T'
import { Button } from '../ui/Button'

export const PostsList: FC = () => {
  return (
    <div>
      <T color="100" size="h1" className="mb-2" block>
        Posts
      </T>
      <Suspense fallback="Loading">
        <SmallErrorBoundary>
          <PostsContent />
        </SmallErrorBoundary>
      </Suspense>
    </div>
  )
}

const PostsContent: FC = () => {
  const { keys } = useQueryKeys()
  const fetchKey = keys[QueryListKey.Posts]
  const initialFetchKey = useRef(fetchKey)
  const queryData = useLazyLoadQuery<PostsList_PostsQuery>(
    graphql`
      query PostsList_PostsQuery {
        ...PostsList_Fragment_Query
      }
    `,
    { fetchPolicy: 'network-only' }
  )

  const { data, loadNext, loadPrevious, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment PostsList_Fragment_Query on Query
      @argumentDefinitions(
        after: { type: "ID" }
        before: { type: "ID" }
        orderBy: {
          type: "PostOrderByUpdatedAtInput"
          defaultValue: { updatedAt: desc }
        }
        first: { type: "Int" }
        last: { type: "Int" }
      )
      @refetchable(queryName: "PostsList_FragmentRefetchQuery") {
        posts(
          after: $after
          first: $first
          before: $before
          last: $last
          orderBy: $orderBy
        ) @connection(key: "PostsList_Fragment_posts") {
          edges {
            node {
              id
              ...PostInfo_post
              ...PostAuthor_post
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
    queryData
  )

  useEffect(() => {
    if (initialFetchKey.current === fetchKey) return
    loadPrevious(10)
  }, [fetchKey, loadPrevious])

  const { posts } = data as PostsList_Fragment_Query$data

  if (posts.edges.length === 0) return <>No posts</>

  return (
    <div className="rounded-lg bg-black/5 p-10 flex flex-col gap-3">
      {posts.edges.map((e) => {
        if (!e) return null

        return (
          <div key={e?.cursor} className="rounded bg-white p-5">
            <PostInfo post$key={e.node} />
            <PostAuthor post$key={e.node} />
          </div>
        )
      })}
      {isLoadingNext && <>Loading...</>}
      {posts.pageInfo.hasNextPage && (
        <div>
          <Button onClick={() => loadNext(3)}>Load more</Button>
        </div>
      )}
    </div>
  )
}
