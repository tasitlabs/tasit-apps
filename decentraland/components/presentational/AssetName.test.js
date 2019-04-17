import React from "react";
import { shallow } from "enzyme";
import AssetName from "./AssetName";
import { parcel, estateWithoutName } from "@helpers/testHelpers";

describe("AssetName", () => {
  describe("renders the component", () => {
    it("asset with name", async () => {
      const asset = parcel;
      expect(shallow(<AssetName asset={asset} />)).toMatchSnapshot();
    });

    it("asset without name", async () => {
      const asset = estateWithoutName;
      expect(shallow(<AssetName asset={asset} />)).toMatchSnapshot();
    });
  });
});
