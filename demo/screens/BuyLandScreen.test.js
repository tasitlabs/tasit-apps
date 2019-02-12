import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { BuyLandScreen } from "./BuyLandScreen";

describe("BuyLandScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const selectedLandToBuy = {
      id: 123,
      priceMana: 0,
      priceUSD: 0,
      asset: {
        id: -1,
        name: "Not found",
        img: "https://decentraland.org/images/logo-65f7b27caf.png",
      },
    };

    const account = {};
    const navigation = () => {};
    const removeLandForSale = () => {};

    expect(
      shallow(
        <BuyLandScreen
          navigation={navigation}
          account={account}
          selectedLandToBuy={selectedLandToBuy}
          removeLandForSale={removeLandForSale}
        />
      )
    ).toMatchSnapshot();
  });
});
