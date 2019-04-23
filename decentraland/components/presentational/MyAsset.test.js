import React from "react";
import { shallow } from "enzyme";
import { MyAsset, MyAssetInfo } from "./MyAsset";
import { parcel, parcelUserAction } from "@helpers/testHelpers";

describe("MyAsset", () => {
  it("renders the component", async () => {
    const asset = parcel;
    const userAction = parcelUserAction;

    expect(
      shallow(<MyAsset asset={asset} userAction={userAction} />)
    ).toMatchSnapshot();
  });

  describe("MyAssetInfo", () => {
    it("renders the component", async () => {
      const asset = parcel;
      const userAction = parcelUserAction;

      expect(
        shallow(<MyAssetInfo asset={asset} userAction={userAction} />)
      ).toMatchSnapshot();
    });
  });
});
