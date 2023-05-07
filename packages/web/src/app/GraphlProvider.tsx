import { FC, PropsWithChildren, useRef } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import {
  authMiddleware,
  ConcreteBatch,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware,
  QueryPayload,
  RelayNetworkLayer,
  RelayObservable,
  urlMiddleware,
} from 'react-relay-network-modern'
import {
  type GraphQLResponse,
  Environment,
  RecordSource,
  Store,
  Observable,
} from 'relay-runtime'

import type { Variables } from 'react-relay'

const GRAPHQL_URL = 'http://localhost:4000'

const executeSubscription = (
  operation: ConcreteBatch,
  variables: Variables
) => {
  if (!operation.text) throw new Error('Missing document.')

  const url = new URL(GRAPHQL_URL)
  url.searchParams.append('query', operation.text)
  if (operation.name) {
    url.searchParams.append('operationName', operation.name)
  }
  if (variables) {
    url.searchParams.append('variables', JSON.stringify(variables))
  }

  const observable = Observable.create<GraphQLResponse>((sink) => {
    const source = new EventSource(url.toString())
    source.onmessage = function (event) {
      const data = JSON.parse(event.data)
      sink.next(data)
      if (source.readyState === 2) {
        sink.complete()
      }
    }
    source.onerror = function (ev) {
      console.error(ev)
      sink.error(new Error('Unexpected error.'))
    }
    source.addEventListener('complete', () => {
      source.close() // If operation ends, close the connection and prevent the client from reconnecting
    })
    return () => source.close()
  })

  return observable as unknown as RelayObservable<QueryPayload>
}

// const network = Network.create(executeQueryOrMutation, executeSubscription)

const createRelayNetworkLayer = (getAccessToken: (v?: boolean) => string) => {
  const network = new RelayNetworkLayer(
    [
      urlMiddleware({
        url: () => Promise.resolve(GRAPHQL_URL),
      }),
      (next) => (req) => {
        if (typeof req.fetchOpts.body === 'string') {
          const parsedBody = JSON.parse(req.fetchOpts.body)
          const operationName = parsedBody.id
          delete parsedBody.id
          parsedBody.operationName = operationName
          req.fetchOpts.body = JSON.stringify(parsedBody)
        }
        return next(req)
      },
      loggerMiddleware(),
      errorMiddleware(),
      perfMiddleware(),
      authMiddleware({
        token: () => getAccessToken(),
        tokenRefreshPromise: () => getAccessToken(true),
      }),
    ],
    {
      subscribeFn: executeSubscription,
    }
  )

  const source = new RecordSource()
  const store = new Store(source)
  return new Environment({ network, store })
}

const getAccessToken = () => 'yo!'

export const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => {
  const relayEnvironment = useRef(
    createRelayNetworkLayer(getAccessToken)
  ).current

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  )
}
