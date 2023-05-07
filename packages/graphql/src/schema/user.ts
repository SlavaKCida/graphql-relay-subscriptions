// import { encodeGlobalID } from '@pothos/plugin-relay'
import { User } from '@prisma/client'
import { builder } from '../builder'
import { prisma } from '../db'
import { MutationType, PubSubEventType, pubsub } from '../pubsub'
import { PostCreateInput } from './post'
import { encodeGlobalID } from '@pothos/plugin-relay'

builder.prismaNode('User', {
  id: { field: 'id' },
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.prismaField({
      type: ['Post'],
      args: {
        first: t.arg.int({ required: true }),
      },
      resolve: (query, user, args) =>
        prisma.post.findMany({
          ...query,
          take: args.first,
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            authorId: user.id,
          },
        }),
    }),
  }),
})

export const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: (t) => ({
    id: t.string({}),
    email: t.string({}),
  }),
})

const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string({}),
    posts: t.field({ type: [PostCreateInput] }),
  }),
})

builder.queryFields((t) => ({
  allUsers: t.prismaField({
    type: ['User'],
    resolve: (query) => prisma.user.findMany({ ...query }),
  }),
  userById: t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: (query, parent, args) =>
      prisma.user.findUnique({
        ...query,
        where: { id: args.id.id },
      }),
  }),
}))

builder.mutationFields((t) => ({
  signupUser: t.prismaField({
    type: 'User',
    args: {
      data: t.arg({
        type: UserCreateInput,
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx) => {
      const user = await prisma.user.create({
        ...query,
        data: {
          email: args.data.email,
          name: args.data.name,
          posts: {
            create: (args.data.posts ?? []).map((post) => ({
              title: post.title,
              content: post.content ?? undefined,
            })),
          },
        },
      })

      pubSubPublish({
        pubSub: ctx.pubsub,
        node: user,
        mutationType: MutationType.CREATED,
      })

      return user
    },
  }),
}))

const pubSubPublish = ({
  pubSub,
  node,
  mutationType,
}: {
  pubSub: typeof pubsub
  node: User
  mutationType: MutationType
}) => {
  pubSub.publish('updates', {
    type: PubSubEventType.User,
    mutationType,
    id: encodeGlobalID('User', node.id),
  })

  pubSub.publish('userUpdates', {
    mutationType,
    node,
  })
}
