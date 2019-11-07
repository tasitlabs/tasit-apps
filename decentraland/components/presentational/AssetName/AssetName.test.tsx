import React from "react";
import { shallow } from "enzyme";
import AssetName from "../AssetName";
import { parcel, estateWithoutName } from "../../../helpers/testHelpers";

describe("AssetName", () => {
  describe("renders the component", () => {
    it("asset with name", async () => {
      const { name } = parcel;
      expect(shallow(<AssetName name={name} />)).toMatchSnapshot();
    });

    it("asset without name", async () => {
      const { name } = estateWithoutName;
      expect(shallow(<AssetName name={name} />)).toMatchSnapshot();
    });
  });
});
