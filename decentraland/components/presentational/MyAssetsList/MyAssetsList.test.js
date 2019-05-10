import React from "react";
import { shallow } from "enzyme";
import MyAssetsList from "@presentational/MyAssetsList";
import { estate, userActions } from "@helpers/testHelpers";

describe("MyAssetsList", () => {
  describe("renders the component", () => {
    const myAssetRenderer = () => {};

    it("without assets", async () => {
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

    it("with assets", async () => {
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
