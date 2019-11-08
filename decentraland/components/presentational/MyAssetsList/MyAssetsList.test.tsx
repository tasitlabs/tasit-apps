import React from "react";
import { shallow } from "enzyme";
import MyAssetsList from "../MyAssetsList";
import { estate, userActions } from "../../../helpers/testHelpers";

describe("MyAssetsList", () => {
  describe("renders the component", () => {
    // TODO: Determine if this needs to return
    // JSX.Element and valid minimal JSX for this test suite to work
    const myAssetRenderer = (): void => {};

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
