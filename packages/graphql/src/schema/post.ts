import { builder } from '../builder'
import { prisma } from '../db'
import { MutationType } from '../pubsub'
import { UserUniqueInput } from './user'

builder.prismaNode('Post', {
  id: { field: 'id' },
  fields: (t) => ({
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    title: t.exposeString('title'),
    published: t.exposeBoolean('published'),
    content: t.exposeString('content', { nullable: true }),
    viewCount: t.exposeInt('viewCount'),
    author: t.relation('author', {}),
  }),
})

export const PostCreateInput = builder.inputType('PostCreateInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({}),
  }),
})

const SortOrder = builder.enumType('SortOrder', {
  values: ['asc', 'desc'] as const,
})

const PostOrderByUpdatedAtInput = builder.inputType(
  'PostOrderByUpdatedAtInput',
  {
    fields: (t) => ({
      updatedAt: t.field({
        type: SortOrder,
        required: true,
      }),
    }),
  }
)

builder.queryFields((t) => ({
  postById: t.prismaField({
    type: 'Post',
    nullable: true,
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: (query, parent, args) =>
      prisma.post.findUnique({
        ...query,
        where: { id: args.id.id },
      }),
  }),
  posts: t.prismaConnection({
    type: 'Post',
    args: {
      searchString: t.arg.string({}),
      orderBy: t.arg({
        type: PostOrderByUpdatedAtInput,
      }),
    },
    cursor: 'id',
    resolve: (query, parent, args) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {}

      return prisma.post.findMany({
        ...query,
        where: {
          ...or,
        },
        orderBy: args.orderBy ?? undefined,
      })
    },
  }),
  draftsByUser: t.prismaField({
    type: ['Post'],
    nullable: true,
    args: {
      userUniqueInput: t.arg({
        type: UserUniqueInput,
        required: true,
      }),
    },
    resolve: (query, parent, args) => {
      return prisma.user
        .findUnique({
          where: {
            id: args.userUniqueInput.id ?? undefined,
            email: args.userUniqueInput.email ?? undefined,
          },
        })
        .posts({
          ...query,
          where: {
            published: false,
          },
        })
    },
  }),
}))

builder.mutationFields((t) => ({
  createDraft: t.prismaField({
    type: 'Post',
    args: {
      data: t.arg({
        type: PostCreateInput,
        required: true,
      }),
      authorEmail: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      const createdPost = await prisma.post.create({
        ...query,
        data: {
          title: args.data.title,
          content: args.data.content ?? undefined,
          published: false,
          author: {
            connect: {
              email: args.authorEmail,
            },
          },
        },
      })

      ctx.pubsub.publish('posts', {
        mutationType: MutationType.CREATED,
        post: createdPost,
      })

      return createdPost
    },
  }),
  togglePublishPost: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      // Toggling become simpler once this bug is resolved: https://github.com/prisma/prisma/issues/16715
      const postPublished = await prisma.post.findUnique({
        where: { id: args.id.id },
        select: { published: true },
      })

      const updatedPost = await prisma.post.update({
        ...query,
        where: { id: args.id.id },
        data: { published: !postPublished?.published },
      })

      ctx.pubsub.publish('post', args.id.id, {
        mutationType: MutationType.UPDATED,
        post: updatedPost,
      })

      return updatedPost
    },
  }),
  incrementPostViewCount: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      const post = await prisma.post.update({
        ...query,
        where: { id: args.id.id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      })

      ctx.pubsub.publish('post', args.id.id, {
        mutationType: MutationType.UPDATED,
        post,
      })

      return post
    },
  }),
  deletePost: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      const post = await prisma.post.delete({
        ...query,
        where: { id: args.id.id },
      })

      ctx.pubsub.publish('post', args.id.id, {
        mutationType: MutationType.DELETED,
        post,
      })

      ctx.pubsub.publish('posts', {
        mutationType: MutationType.DELETED,
        post,
      })

      return post
    },
  }),
}))
