/**
 * @generated SignedSource<<7a682e63e11b766088b25d5a715c5a00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserDraftsCount_user$data = {
  readonly draftsCount: number;
  readonly " $fragmentType": "UserDraftsCount_user";
};
export type UserDraftsCount_user$key = {
  readonly " $data"?: UserDraftsCount_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserDraftsCount_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserDraftsCount_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "draftsCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "fe7935db9f656f8efb9c70b00d779901";

export default node;
