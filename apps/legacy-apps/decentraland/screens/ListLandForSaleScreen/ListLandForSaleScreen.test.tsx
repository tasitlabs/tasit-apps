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

    const appendLandForSaleToList = (): void => {};
    const selectLandToBuy = (): void => {};
    const setLoadingAssetsForSaleInProgress = (): void => {};

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
