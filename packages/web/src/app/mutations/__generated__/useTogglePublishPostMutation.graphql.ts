/**
 * @generated SignedSource<<61f832f2433602d134c6ab22993b4ced>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useTogglePublishPostMutation$variables = {
  id: string;
};
export type useTogglePublishPostMutation$data = {
  readonly togglePublishPost: {
    readonly id: string;
    readonly published: boolean;
  };
};
export type useTogglePublishPostMutation = {
  response: useTogglePublishPostMutation$data;
  variables: useTogglePublishPostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "togglePublishPost",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useTogglePublishPostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useTogglePublishPostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "82a9d10245a1e294ca780c96f1c4b87f",
    "id": null,
    "metadata": {},
    "name": "useTogglePublishPostMutation",
    "operationKind": "mutation",
    "text": "mutation useTogglePublishPostMutation(\n  $id: ID!\n) {\n  togglePublishPost(id: $id) {\n    id\n    published\n  }\n}\n"
  }
};
})();

(node as any).hash = "abfc26b2fb67a72843ccc9575f9c1a42";

export default node;
