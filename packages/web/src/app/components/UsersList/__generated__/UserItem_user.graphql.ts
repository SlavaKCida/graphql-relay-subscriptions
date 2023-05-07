/**
 * @generated SignedSource<<5ea5833858a3a23078934afb80f35eed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserItem_user$data = {
  readonly email: string;
  readonly id: string;
  readonly name: string | null;
  readonly " $fragmentType": "UserItem_user";
};
export type UserItem_user$key = {
  readonly " $data"?: UserItem_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserItem_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserItem_user",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "e842e0fd6cc1b3f1a310902df5485443";

export default node;
