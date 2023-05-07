import { builder } from '../builder'
import { prisma } from '../db'
import {
  MutationType,
  PubSubEvent,
  PubSubPostEvent,
  PubSubUserEvent,
} from '../pubsub'

builder.enumType(MutationType, {
  name: 'MutationType',
})

const SubscriptionEvent = builder
  .interfaceRef<PubSubEvent>('SubscriptionEvent')
  .implement({
    fields: (t) => ({
      mutationType: t.exposeString('mutationType'),
    }),
  })

const SubscriptionPostEvent = builder.objectRef<PubSubPostEvent>(
  'SubscriptionPostEvent'
)

SubscriptionPostEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    post: t.prismaField({
      type: 'Post',
      nullable: true,
      resolve: (query, event) =>
        prisma.post.findUnique({
          ...query,
          where: { id: event.post.id },
        }),
    }),
  }),
})

const SubscriptionUserEvent = builder.objectRef<PubSubUserEvent>(
  'SubscriptionUserEvent'
)

SubscriptionUserEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    user: t.prismaField({
      type: 'User',
      nullable: true,
      resolve: (query, event) =>
        prisma.user.findUnique({
          ...query,
          where: { id: event.user.id },
        }),
    }),
  }),
})

builder.subscriptionType({
  fields: (t) => ({
    post: t.field({
      type: SubscriptionPostEvent,
      nullable: true,
      args: {
        id: t.arg.globalID({ required: true }),
      },
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('post', args.id.id),
      resolve: (event) => event,
    }),
    posts: t.field({
      type: SubscriptionPostEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('posts'),
      resolve: (payload) => payload,
    }),
    user: t.field({
      type: SubscriptionUserEvent,
      nullable: true,
      args: {
        id: t.arg.globalID({ required: true }),
      },
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('user', args.id.id),
      resolve: (event) => event,
    }),
    users: t.field({
      type: SubscriptionUserEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe('users'),
      resolve: (payload) => payload,
    }),
  }),
})
