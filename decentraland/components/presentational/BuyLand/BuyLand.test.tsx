import React from "react";
import { shallow } from "enzyme";
import BuyLand from "../BuyLand";
import { parcelForSale } from "../../../helpers/testHelpers";
import AccountCreationStatus from "../../../constants/AccountCreationStatus";
const { NOT_STARTED } = AccountCreationStatus;

describe("BuyLand", () => {
  it("initial state - before start account setup", () => {
    const landForSale = parcelForSale;

    const onBuy = (): void => {};

    const accountCreationStatus = NOT_STARTED;
    const accountCreationActions = {};

    expect(
      shallow(
        <BuyLand
          landForSale={landForSale}
          onBuy={onBuy}
          accountCreationStatus={accountCreationStatus}
          accountCreationActions={accountCreationActions}
        />
      )
    ).toMatchSnapshot();
  });
});
