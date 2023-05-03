/**
 * @generated SignedSource<<2c337c9b68cd54f4b957eb2d2bfdd19c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UsersList_AllUsersQuery$variables = {};
export type UsersList_AllUsersQuery$data = {
  readonly allUsers: ReadonlyArray<{
    readonly email: string;
    readonly id: string;
    readonly name: string | null;
  }>;
};
export type UsersList_AllUsersQuery = {
  response: UsersList_AllUsersQuery$data;
  variables: UsersList_AllUsersQuery$variables;
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
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "UsersList_AllUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersList_AllUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4f2944bf1eb8bde093de66ef6f6c0b49",
    "id": null,
    "metadata": {},
    "name": "UsersList_AllUsersQuery",
    "operationKind": "query",
    "text": "query UsersList_AllUsersQuery {\n  allUsers {\n    id\n    email\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2887ff82a635c0967d8c773cb2edba5";

export default node;
