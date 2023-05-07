import { Post, User } from '@prisma/client'
import { createPubSub } from 'graphql-yoga'

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface PubSubEvent {
  mutationType: MutationType
}

export interface PubSubUserEvent extends PubSubEvent {
  user: User
}

export interface PubSubPostEvent extends PubSubEvent {
  post: Post
}

export interface PuSubEvents
  extends Record<string, [PubSubEvent] | [string, PubSubEvent]> {
  user: [string, PubSubUserEvent]
  post: [string, PubSubPostEvent]
  users: [PubSubUserEvent]
  posts: [PubSubPostEvent]
}

export const pubsub = createPubSub<PuSubEvents>({})
