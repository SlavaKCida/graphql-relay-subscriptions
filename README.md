# Synced

## Overview

0. Project preview, what we're building

- http://localhost:4200

1. What is graphql

- https://graphql.org/
- Single endpoint
- Schema
- Syntax
- Developer tools provided by server and client framework

2. The schema

- How the schema is defined
- How schema is exposed
- How client reads schema

3. Queries, mutations, subscriptions

- Models
- Query
- Model fields with params
- Mutations
- Subscriptions

4. Server

- Graphql server
- Comparing to REST

5. Client

- Apollo and Relay
- Types generation
- Tools provided for pagination and requesting data

### Client <-> Server data exchange

#### 5.1 Query

Client: requests with Graphql syntax and params
-> Server: parses request
-> Server: performs resolvers on each field within requested models
-> Server: responds with data according to the request
-> Client: Receive data, update cache

#### 5.1 Mutation

Client: requests with Graphql syntax and params
-> Server: parses request
-> Server: mutate data according to the params
-> Server: performs resolvers on each field within requested models
-> Server: responds with data according to the request
-> Client: Receive data, update cache

#### 5.1 Subscriptions

Client: Initiate subscription over SSE or WS and keeps connection alive
-> Server: parses request
-> Server: once triggered responds with data according to the request
-> Client: Receive data, update cache
-> Client: Close connection when needed

6. Cache

- Way of persisting the cache
- Serialization and updating the cache

7. Types, models, fragments

- Dev-time code generation for type-safety

8. Relay for React

- Core concept
- Server requirements

9. Real-time updates with subscriptions

- SSE and WS
- Suitable for stay in sync with BE

## Example

1. Server. Prisma ORM
2. Server. Graphql server + yoga graphql
3. Server. Pothos
4. Client. Relay
5. Client. Relay code generation
6. Client. Cache
7. Client. Relay fragments and connections
8. Client. Suspense and querying data
9. Server. Relay server spec
10. Client. Relay features
11. Client. Real-time updates with subscriptions
