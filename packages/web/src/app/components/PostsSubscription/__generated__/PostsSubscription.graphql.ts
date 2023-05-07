/**
 * @generated SignedSource<<003dd5185b12627d418cffd0b73e9807>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type PostsSubscription$variables = {};
export type PostsSubscription$data = {
  readonly posts: {
    readonly mutationType: string;
    readonly post: {
      readonly id: string;
    } | null;
  };
};
export type PostsSubscription = {
  response: PostsSubscription$data;
  variables: PostsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SubscriptionPostEvent",
    "kind": "LinkedField",
    "name": "posts",
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
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "PostsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PostsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e707f6385b454feac280784ea59c1410",
    "id": null,
    "metadata": {},
    "name": "PostsSubscription",
    "operationKind": "subscription",
    "text": "subscription PostsSubscription {\n  posts {\n    mutationType\n    post {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6fe064e2ed3e04d10321b1e6a7c0be8b";

export default node;
