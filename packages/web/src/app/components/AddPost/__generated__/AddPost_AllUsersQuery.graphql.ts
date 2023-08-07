/**
 * @generated SignedSource<<f8aec2322a5e88200b70f8d10aab9ceb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AddPost_AllUsersQuery$variables = {};
export type AddPost_AllUsersQuery$data = {
  readonly allUsers: ReadonlyArray<{
    readonly email: string;
    readonly id: string;
    readonly name: string | null;
  }>;
};
export type AddPost_AllUsersQuery = {
  response: AddPost_AllUsersQuery$data;
  variables: AddPost_AllUsersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "allUsers",
    "plural": true,
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddPost_AllUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddPost_AllUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eae9ff15a4cba9d1a9dda5ca803b0391",
    "id": null,
    "metadata": {},
    "name": "AddPost_AllUsersQuery",
    "operationKind": "query",
    "text": "query AddPost_AllUsersQuery {\n  allUsers {\n    id\n    name\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "9974ebeaac887ee5d0f890842ee7a774";

export default node;
