import React from "react";
import { shallow } from "enzyme";
import MyAsset from "./MyAsset";
import { parcel } from "@helpers/testHelpers";

describe("MyAsset", () => {
  it("renders the component", async () => {
    expect(shallow(<MyAsset asset={parcel} />)).toMatchSnapshot();
  });
});
