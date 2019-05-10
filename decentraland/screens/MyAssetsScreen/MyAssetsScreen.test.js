import React from "react";
import { shallow } from "enzyme";
import { MyAssetsScreen } from "./MyAssetsScreen";
import { parcel, parcelUserAction } from "@helpers/testHelpers";

describe("ListLandForSaleScreen", () => {
  describe("renders the component", () => {
    it("without assets", async () => {
      const myAssets = [];
      const userActions = {};
      expect(
        shallow(
          <MyAssetsScreen myAssets={myAssets} userActions={userActions} />
        )
      ).toMatchSnapshot();
    });
    it("with assets", async () => {
      const myAssets = [parcel];
      const userActions = { ...parcelUserAction };
      expect(
        shallow(
          <MyAssetsScreen myAssets={myAssets} userActions={userActions} />
        )
      ).toMatchSnapshot();
    });
  });
});
