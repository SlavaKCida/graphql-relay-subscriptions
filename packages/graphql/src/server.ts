import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'
import { pubsub } from './pubsub'

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
  logging: true,
  context: (req) => {
    return {
      pubsub,
      req,
    }
  },
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.log(`\
🚀 Server ready at: http://127.0.0.1:4000
  `)
})
