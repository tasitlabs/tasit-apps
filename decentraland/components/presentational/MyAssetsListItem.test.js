import React from "react";
import { shallow } from "enzyme";
import MyAssetsListItem from "./MyAssetsListItem";
import { parcel } from "./testHelpers";

describe("MyAssetsListItem", () => {
  it("renders the component", async () => {
    expect(shallow(<MyAssetsListItem asset={parcel} />)).toMatchSnapshot();
  });
});
