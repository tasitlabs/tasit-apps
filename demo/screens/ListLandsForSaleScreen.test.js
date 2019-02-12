import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListLandsForSaleScreen } from "./ListLandsForSaleScreen";

describe("ListLandsForSaleScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const landsForSale = [];
    const setLandsForSale = () => {};
    const selectLandToBuy = () => {};
    expect(
      shallow(
        <ListLandsForSaleScreen
          landsForSale={landsForSale}
          setLandsForSale={setLandsForSale}
          selectLandToBuy={selectLandToBuy}
        />
      )
    ).toMatchSnapshot();
  });
});
