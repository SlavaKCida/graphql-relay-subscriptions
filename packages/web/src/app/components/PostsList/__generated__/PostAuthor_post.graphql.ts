/**
 * @generated SignedSource<<e9de2de1b17fec0d494d2b4bac45ba05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostAuthor_post$data = {
  readonly author: {
    readonly email: string;
    readonly name: string | null;
  };
  readonly " $fragmentType": "PostAuthor_post";
};
export type PostAuthor_post$key = {
  readonly " $data"?: PostAuthor_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostAuthor_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAuthor_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
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
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "6defed5d324f81dbdf0460bf0f36a1d8";

export default node;
