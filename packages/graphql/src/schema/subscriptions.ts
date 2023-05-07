import { builder } from '../builder'
import { prisma } from '../db'
import {
  MutationType,
  PubSubEventType,
  PubSubPostEvent,
  PubSubUpdateEvent,
  PubSubUserEvent,
} from '../pubsub'

builder.enumType(MutationType, {
  name: 'MutationType',
})

builder.enumType(PubSubEventType, {
  name: 'PubSubEventType',
})

const SubscriptionPostEvent = builder
  .objectRef<PubSubPostEvent>('SubscriptionPostEvent')
  .implement({
    fields: (t) => ({
      mutationType: t.expose('mutationType', { type: MutationType }),
      node: t.prismaField({
        type: 'Post',
        nullable: true,
        resolve: (query, event) => {
          return prisma.post.findUnique({
            ...query,
            where: { id: event.node.id },
          })
        },
      }),
    }),
  })

const SubscriptionUpdateEvent = builder
  .interfaceRef<PubSubUpdateEvent>('PubSubUpdateEvent')
  .implement({
    fields: (t) => ({
      mutationType: t.expose('mutationType', { type: MutationType }),
      type: t.expose('type', { type: PubSubEventType }),
      id: t.expose('id', { type: 'ID' }),
    }),
  })

// const SubscriptionUserEvent = builder.objectRef<PubSubUserEvent>(
//   'SubscriptionUserEvent'
// )

// SubscriptionUserEvent.implement({
//   interfaces: [Sub],
//   fields: (t) => ({
//     user: t.prismaField({
//       type: 'User',
//       nullable: true,
//       resolve: (query, event) =>
//         prisma.user.findUnique({
//           ...query,
//           where: { id: event.user.id },
//         }),
//     }),
//   }),
// })

const SubscriptionUserEvent = builder
  .objectRef<PubSubUserEvent>('SubscriptionUserEvent')
  .implement({
    fields: (t) => ({
      mutationType: t.expose('mutationType', { type: MutationType }),
      node: t.prismaField({
        type: 'User',
        nullable: true,
        resolve: (query, event) => {
          return prisma.user.findUnique({
            ...query,
            where: { id: event.node.id },
          })
        },
      }),
    }),
  })

// const SubscriptionPostEventImpl = builder.objectRef<PubSubEvent>(
//   'SubscriptionEvent'
// )

// SubscriptionPostEventImpl.implement({
//   interfaces: [SubscriptionEvent],
//   fields: (t) => ({

//     }),
//   }),
// })

// const SubscriptionUserEventImpl = builder.objectRef<PubSubEvent>(
//   'SubscriptionUserEvent'
// )

// SubscriptionUserEventImpl.implement({
//   interfaces: [SubscriptionEvent],
//   fields: (t) => ({
//     node: t.prismaField({
//       type: 'User',
//       nullable: true,
//       resolve: (query, event) =>
//         prisma.user.findUnique({
//           ...query,
//           where: { id: event.node.id },
//         }),
//     }),
//   }),
// })

builder.subscriptionType({
  fields: (t) => ({
    postUpdates: t.field({
      type: SubscriptionPostEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('postUpdates'),
      resolve: (payload) => payload,
    }),
    userUpdates: t.field({
      type: SubscriptionUserEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('userUpdates'),
      resolve: (payload) => payload,
    }),
    updates: t.field({
      type: SubscriptionUpdateEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('updates'),
      resolve: (payload) => payload,
    }),
  }),
})
