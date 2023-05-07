import { Post, User } from '@prisma/client'
import { createPubSub } from 'graphql-yoga'

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export enum PubSubEventType {
  'User' = 'User',
  'Post' = 'Post',
}

export type PubSubUpdateEvent = {
  type: PubSubEventType
  mutationType: MutationType
  id: string
}

export interface PubSubUserEvent {
  mutationType: MutationType
  node: User
}

export interface PubSubPostEvent {
  mutationType: MutationType
  node: Post
}

export type PubSubEvent = PubSubPostEvent | PubSubUserEvent | PubSubUpdateEvent

export interface PuSubEvents
  extends Record<string, [PubSubEvent] | [string, PubSubEvent]> {
  updates: [PubSubUpdateEvent]
  userUpdates: [PubSubUserEvent]
  postUpdates: [PubSubPostEvent]
}

export const pubsub = createPubSub<PuSubEvents>({})
