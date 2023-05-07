/**
 * @generated SignedSource<<b458237a4ef1bd86e82835d3d20d0802>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MutationType = "CREATED" | "DELETED" | "UPDATED" | "%future added value";
export type EventsSubscription$variables = {};
export type EventsSubscription$data = {
  readonly postUpdates: {
    readonly mutationType: MutationType;
    readonly node: {
      readonly id: string;
      readonly published: boolean;
    } | null;
  };
};
export type EventsSubscription = {
  response: EventsSubscription$data;
  variables: EventsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SubscriptionPostEvent",
    "kind": "LinkedField",
    "name": "postUpdates",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mutationType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "published",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EventsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EventsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6f466e67cd5823f7923b85b6d7316b34",
    "id": null,
    "metadata": {},
    "name": "EventsSubscription",
    "operationKind": "subscription",
    "text": "subscription EventsSubscription {\n  postUpdates {\n    mutationType\n    node {\n      id\n      published\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "20c4e809df771d39380b612416380851";

export default node;
