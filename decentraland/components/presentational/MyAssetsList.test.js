import React from "react";
import { shallow } from "enzyme";
import MyAssetsList from "./MyAssetsList";
import { estate } from "./testHelpers";

describe("MyAssetsList", () => {
  describe("renders the component", () => {
    const myAssetRenderer = () => {};
    it("without assets", async () => {
      const myAssetsList = [];
      expect(
        shallow(
          <MyAssetsList
            myAssetsList={myAssetsList}
            renderItem={myAssetRenderer}
          />
        )
      ).toMatchSnapshot();
    });

    it("with assets", async () => {
      const myAssetsList = [estate];
      expect(
        shallow(
          <MyAssetsList
            myAssetsList={myAssetsList}
            renderItem={myAssetRenderer}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
