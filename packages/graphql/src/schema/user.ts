// import { encodeGlobalID } from '@pothos/plugin-relay'
import { builder } from '../builder'
import { prisma } from '../db'
import { PostCreateInput } from './post'

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

    // posts: t.relation('posts', {
    //   args: {
    //     first: t.arg.int({ required: true }),
    //   },
    //   resolve: (query, parent, args, context, info) => {
    //       return prisma.post.findMany({})
    //   },
    // }),
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
    resolve: (query, parent, args) => {
      return prisma.user.create({
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
    },
  }),
}))
