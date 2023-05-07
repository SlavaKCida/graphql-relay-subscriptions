/**
 * @generated SignedSource<<b98a0457153da8a2207d0a53f283975c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsersList_AllUsersQuery$variables = {
  first: number;
};
export type UsersList_AllUsersQuery$data = {
  readonly allUsers: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserItem_user" | "UserPosts_user">;
  }>;
};
export type UsersList_AllUsersQuery = {
  response: UsersList_AllUsersQuery$data;
  variables: UsersList_AllUsersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersList_AllUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "allUsers",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserItem_user"
          },
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "UserPosts_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersList_AllUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "allUsers",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
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
            "args": (v2/*: any*/),
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
    "cacheID": "9c4877d2e9e0633703a777e6e9473114",
    "id": null,
    "metadata": {},
    "name": "UsersList_AllUsersQuery",
    "operationKind": "query",
    "text": "query UsersList_AllUsersQuery(\n  $first: Int!\n) {\n  allUsers {\n    id\n    ...UserItem_user\n    ...UserPosts_user_3ASum4\n  }\n}\n\nfragment PostInfo_post on Post {\n  id\n  content\n  title\n  createdAt\n  published\n}\n\nfragment UserItem_user on User {\n  id\n  email\n  name\n}\n\nfragment UserPosts_user_3ASum4 on User {\n  name\n  posts(first: $first) {\n    id\n    ...PostInfo_post\n  }\n}\n"
  }
};
})();

(node as any).hash = "65c293344fc4a8011e4790882e9964af";

export default node;
