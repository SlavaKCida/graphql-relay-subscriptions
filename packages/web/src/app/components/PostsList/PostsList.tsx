import { FC, Suspense, useEffect } from 'react'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { PostInfo } from './PostInfo'
import { PostsList_PostsQuery } from './__generated__/PostsList_PostsQuery.graphql'
import { PostsList_Fragment_Query$data } from './__generated__/PostsList_Fragment_Query.graphql'
import { PostAuthor } from './PostAuthor'
import { QueryListKey, useQueryKeys } from '../../GraphqlFetchKeyProvider'

export const PostsList: FC = () => {
  return (
    <div>
      <p className="text-3xl text-black/20 mb-4">Posts</p>
      <Suspense fallback="Loading">
        <SmallErrorBoundary>
          <PostsContent />
        </SmallErrorBoundary>
      </Suspense>
    </div>
  )
}

const PostsContent: FC = () => {
  const queryData = useLazyLoadQuery<PostsList_PostsQuery>(
    graphql`
      query PostsList_PostsQuery {
        ...PostsList_Fragment_Query
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' }
  )

  const { data, loadNext, loadPrevious, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment PostsList_Fragment_Query on Query
      @argumentDefinitions(
        cursor: { type: "ID" }
        orderBy: {
          type: "PostOrderByUpdatedAtInput"
          defaultValue: { updatedAt: desc }
        }
        first: { type: "Int", defaultValue: 3 }
      )
      @refetchable(queryName: "PostsList_FragmentRefetchQuery") {
        posts(after: $cursor, first: $first, orderBy: $orderBy)
          @connection(key: "PostsList_Fragment_posts") {
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
  const { keys } = useQueryKeys()
  const fetchKey = keys[QueryListKey.Posts]

  useEffect(() => {
    console.log('this is refetch', fetchKey)
    loadPrevious(3)
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
          <div
            onClick={() => loadNext(3)}
            className="inline-block hover:bg-blue-700 rounded cursor-pointer bg-blue-600 px-5 py-2 text-white"
          >
            Load more
          </div>
        </div>
      )}
    </div>
  )
}
