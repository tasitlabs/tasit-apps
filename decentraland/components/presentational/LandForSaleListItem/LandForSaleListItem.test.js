import React from "react";
import { shallow } from "enzyme";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { parcelForSale } from "@helpers/testHelpers";

describe("LandForSaleListItem", () => {
  it("renders the component", async () => {
    const onPress = () => {};
    expect(
      shallow(
        <LandForSaleListItem landForSale={parcelForSale} onPress={onPress} />
      )
    ).toMatchSnapshot();
  });
});
