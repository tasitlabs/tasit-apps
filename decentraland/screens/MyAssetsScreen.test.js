import React from "react";
import { shallow } from "enzyme";
import { MyAssetsScreen } from "./MyAssetsScreen";
import { parcel } from "@helpers/testHelpers";

describe("ListLandForSaleScreen", () => {
  describe("renders the component", () => {
    const setMyAssetsList = () => {};
    it("without assets", async () => {
      const myAssets = [];
      expect(
        shallow(
          <MyAssetsScreen
            myAssets={myAssets}
            setMyAssetsList={setMyAssetsList}
          />
        )
      ).toMatchSnapshot();
    });
    it("with assets", async () => {
      const myAssets = [parcel];
      expect(
        shallow(
          <MyAssetsScreen
            myAssets={myAssets}
            setMyAssetsList={setMyAssetsList}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
