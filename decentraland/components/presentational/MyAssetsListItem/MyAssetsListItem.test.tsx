import React from "react";
import { shallow } from "enzyme";
import MyAssetsListItem from "../MyAssetsListItem";
import { parcel, parcelUserAction } from "../../../helpers/testHelpers";

describe("MyAssetsListItem", () => {
  it("renders the component", async () => {
    const asset = parcel;
    const userAction = parcelUserAction;
    expect(
      shallow(<MyAssetsListItem asset={asset} userAction={userAction} />)
    ).toMatchSnapshot();
  });
});
