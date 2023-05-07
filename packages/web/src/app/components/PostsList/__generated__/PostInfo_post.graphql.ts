/**
 * @generated SignedSource<<160a02319683f4dec1c11cde3c554eae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostInfo_post$data = {
  readonly content: string | null;
  readonly createdAt: any;
  readonly id: string;
  readonly published: boolean;
  readonly title: string;
  readonly " $fragmentType": "PostInfo_post";
};
export type PostInfo_post$key = {
  readonly " $data"?: PostInfo_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostInfo_post">;
};

import PostInfo_postRefetchQuery_graphql from './PostInfo_postRefetchQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": PostInfo_postRefetchQuery_graphql,
      "identifierField": "id"
    }
  },
  "name": "PostInfo_post",
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
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "bb985c7c340e59661b4bb2efd275dc5a";

export default node;
