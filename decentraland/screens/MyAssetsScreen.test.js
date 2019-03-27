import React from "react";
import { shallow } from "enzyme";
import { MyAssetsScreen } from "./MyAssetsScreen";
import { parcel } from "@presentational/testHelpers";

describe("ListLandForSaleScreen", () => {
  describe("renders the component", () => {
    it("without assets", async () => {
      const myAssets = { list: [] };
      expect(shallow(<MyAssetsScreen myAssets={myAssets} />)).toMatchSnapshot();
    });
    it("with assets", async () => {
      const myAssets = { list: [parcel] };
      expect(shallow(<MyAssetsScreen myAssets={myAssets} />)).toMatchSnapshot();
    });
  });
});
