import React from "react";
import { shallow } from "enzyme";
import LandForSaleListItem from "../LandForSaleListItem";
import { parcelForSale } from "../../../helpers/testHelpers";

describe("LandForSaleListItem", () => {
  it("renders the component", () => {
    const onPress = () => {};
    expect(
      shallow(
        <LandForSaleListItem landForSale={parcelForSale} onPress={onPress} />
      )
    ).toMatchSnapshot();
  });
});
