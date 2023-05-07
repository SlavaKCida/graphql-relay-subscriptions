import { FC, Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { PostInfo } from './PostInfo'
import { PostsList_PostsQuery } from './__generated__/PostsList_PostsQuery.graphql'

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

const PostsList_PostsQuery = graphql`
  query PostsList_PostsQuery {
    ...PostsFragment_Query
  }
`

const PostsFragment_Query = graphql`
  fragment PostsFragment_Query on Query {
    posts {
      edges {
        node {
          id
          ...PostInfo_post
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
`

const PostsContent: FC = () => {
  const { posts } = useLazyLoadQuery<PostsList_PostsQuery>(
    graphql`
      query PostsList_PostsQuery {
        posts {
          edges {
            node {
              id
              ...PostInfo_post
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
    { fetchPolicy: 'store-and-network' }
  )

  if (posts.edges.length === 0) return <>No posts</>

  return (
    <div className="rounded-lg bg-black/5 p-10 flex flex-col gap-3">
      {posts.edges.map((e) => {
        if (!e) return null

        return (
          <div key={e?.cursor} className="rounded bg-white p-5">
            <PostInfo post$key={e.node} />
          </div>
        )
      })}
    </div>
  )
}
