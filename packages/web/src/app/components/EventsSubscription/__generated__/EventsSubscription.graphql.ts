/**
 * @generated SignedSource<<1138bef894aa8698c9ee7ee01663612c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MutationType = "CREATED" | "DELETED" | "UPDATED" | "%future added value";
export type EventsSubscription$variables = {};
export type EventsSubscription$data = {
  readonly postUpdates: {
    readonly mutationType: MutationType;
    readonly node: {
      readonly author: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"UserDraftsCount_user">;
      };
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"PostAuthor_post" | "PostInfo_post">;
    } | null;
  };
};
export type EventsSubscription = {
  response: EventsSubscription$data;
  variables: EventsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mutationType",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EventsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SubscriptionPostEvent",
        "kind": "LinkedField",
        "name": "postUpdates",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "UserDraftsCount_user"
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PostInfo_post"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PostAuthor_post"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EventsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SubscriptionPostEvent",
        "kind": "LinkedField",
        "name": "postUpdates",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "draftsCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
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
    ]
  },
  "params": {
    "cacheID": "05c4df81a4b612cc53c95c9027d91ef7",
    "id": null,
    "metadata": {},
    "name": "EventsSubscription",
    "operationKind": "subscription",
    "text": "subscription EventsSubscription {\n  postUpdates {\n    mutationType\n    node {\n      id\n      author {\n        id\n        ...UserDraftsCount_user\n      }\n      ...PostInfo_post\n      ...PostAuthor_post\n    }\n  }\n}\n\nfragment PostAuthor_post on Post {\n  author {\n    name\n    email\n    id\n  }\n}\n\nfragment PostInfo_post on Post {\n  id\n  content\n  title\n  createdAt\n  published\n}\n\nfragment UserDraftsCount_user on User {\n  draftsCount\n}\n"
  }
};
})();

(node as any).hash = "6175c75a609fa7f8ad0118cf7b041e0b";

export default node;
