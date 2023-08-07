/**
 * @generated SignedSource<<f5fda59258d39034174d1e983e5d36e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserPosts_user$data = {
  readonly id: string;
  readonly name: string | null;
  readonly posts: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostInfo_post">;
  }>;
  readonly " $fragmentType": "UserPosts_user";
};
export type UserPosts_user$key = {
  readonly " $data"?: UserPosts_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserPosts_user">;
};

import UserPosts_postsRefetchQuery_graphql from './UserPosts_postsRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": UserPosts_postsRefetchQuery_graphql,
      "identifierField": "id"
    }
  },
  "name": "UserPosts_user",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "posts",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostInfo_post"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "fb313129e40af2b90c0fac50ebc4e10d";

export default node;
