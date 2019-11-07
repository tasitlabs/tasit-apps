import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListLandForSaleScreen } from "./ListLandForSaleScreen";
describe("ListLandForSaleScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });
  it("renders the component", () => {
    const assetsForSale = { list: [], loadingInProgress: true };
    const appendLandForSaleToList = () => {};
    const selectLandToBuy = () => {};
    const setLoadingAssetsForSaleInProgress = () => {};
    expect(
      shallow(
        <ListLandForSaleScreen
          assetsForSale={assetsForSale}
          appendLandForSaleToList={appendLandForSaleToList}
          selectLandToBuy={selectLandToBuy}
          setLoadingAssetsForSaleInProgress={setLoadingAssetsForSaleInProgress}
        />
      )
    ).toMatchSnapshot();
  });
});
