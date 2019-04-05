import React from "react";
import { shallow } from "enzyme";
import AccountCreationProgress from "./AccountCreationProgress";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { FUNDING_WITH_ETH } = AccountCreationStatus;
import { anAction } from "@helpers/testHelpers";

describe("AccountCreationProgress", () => {
  it("renders the component", async () => {
    const status = FUNDING_WITH_ETH;
    const currentAction = anAction;

    expect(
      shallow(
        <AccountCreationProgress
          status={status}
          currentAction={currentAction}
        />
      )
    ).toMatchSnapshot();
  });
});
