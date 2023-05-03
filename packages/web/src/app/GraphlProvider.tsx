import { FC, PropsWithChildren, useRef } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import {
  authMiddleware,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
} from 'react-relay-network-modern'
import { Environment, RecordSource, Store } from 'relay-runtime'

const createRelayNetworkLayer = (getAccessToken: (v?: boolean) => string) => {
  const network = new RelayNetworkLayer([
    urlMiddleware({
      url: () => Promise.resolve('http://localhost:4000'),
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
      token: async () => await getAccessToken(),
      tokenRefreshPromise: async () => await getAccessToken(true),
    }),
  ])

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
