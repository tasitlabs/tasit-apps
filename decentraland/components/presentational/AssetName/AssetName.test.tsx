import React from "react";
import { shallow } from "enzyme";
import AssetName from "../AssetName";
import { parcel, estateWithoutName } from "../../../helpers/testHelpers";

describe("AssetName", () => {
  describe("renders the component", () => {
    it("asset with name", () => {
      const { name } = parcel;
      expect(shallow(<AssetName name={name} />)).toMatchSnapshot();
    });

    it("asset without name", () => {
      const { name } = estateWithoutName;
      expect(shallow(<AssetName name={name} />)).toMatchSnapshot();
    });
  });
});
