import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListLandForSaleScreen } from "./ListLandForSaleScreen";

describe("ListLandForSaleScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const landForSaleList = [];
    const setLandForSaleList = () => {};
    const selectLandToBuy = () => {};
    expect(
      shallow(
        <ListLandForSaleScreen
          landForSaleList={landForSaleList}
          setLandForSaleList={setLandForSaleList}
          selectLandToBuy={selectLandToBuy}
        />
      )
    ).toMatchSnapshot();
  });
});
