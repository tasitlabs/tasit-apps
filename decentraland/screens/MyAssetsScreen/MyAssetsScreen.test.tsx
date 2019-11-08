import React from "react";
import { shallow } from "enzyme";
import { MyAssetsScreen } from "./MyAssetsScreen";
import { parcel, parcelUserAction } from "../../helpers/testHelpers";

describe("ListLandForSaleScreen", () => {
  describe("renders the component", () => {
    const removeFromMyAssetsList = (): void => {};
    const appendToMyAssetsList = (): void => {};
    const addUserAction = (): void => {};

    it("without assets", () => {
      const myAssets = [];
      const userActions = {};
      expect(
        shallow(
          <MyAssetsScreen
            myAssets={myAssets}
            userActions={userActions}
            removeFromMyAssetsList={removeFromMyAssetsList}
            appendToMyAssetsList={appendToMyAssetsList}
            addUserAction={addUserAction}
          />
        )
      ).toMatchSnapshot();
    });
    it("with assets", () => {
      const myAssets = [parcel];
      const userActions = { ...parcelUserAction };
      expect(
        shallow(
          <MyAssetsScreen
            myAssets={myAssets}
            userActions={userActions}
            removeFromMyAssetsList={removeFromMyAssetsList}
            appendToMyAssetsList={appendToMyAssetsList}
            addUserAction={addUserAction}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
