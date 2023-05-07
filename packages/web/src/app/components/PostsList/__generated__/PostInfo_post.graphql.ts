/**
 * @generated SignedSource<<61d1b66d53236f762d65024f082356b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
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

(node as any).hash = "5e8fcf0a4e601c1c2866ea704802b5de";

export default node;
