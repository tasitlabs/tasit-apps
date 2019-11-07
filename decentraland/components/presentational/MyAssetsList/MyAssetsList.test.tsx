import React from "react";
import { shallow } from "enzyme";
import MyAssetsList from "../MyAssetsList";
import { estate, userActions } from "../../../helpers/testHelpers";

describe("MyAssetsList", () => {
  describe("renders the component", () => {
    const myAssetRenderer = () => {};

    it("without assets", () => {
      const myAssets = [];

      expect(
        shallow(
          <MyAssetsList
            myAssets={myAssets}
            renderItem={myAssetRenderer}
            userActions={userActions}
          />
        )
      ).toMatchSnapshot();
    });

    it("with assets", () => {
      const myAssets = [estate];
      expect(
        shallow(
          <MyAssetsList
            myAssets={myAssets}
            renderItem={myAssetRenderer}
            userActions={userActions}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
