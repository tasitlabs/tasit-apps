import React from "react";
import { shallow } from "enzyme";
import AccountCreationProgress from "./AccountCreationProgress";
import status from "@constants/AccountCreationStatus";
const {
  NOT_STARTED,
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = status;
import { anAction } from "@helpers/testHelpers";

describe("AccountCreationProgress", () => {
  it("initial state - before start account setup", async () => {
    const status = NOT_STARTED;
    const currentAction = null;

    expect(
      shallow(
        <AccountCreationProgress
          status={status}
          currentAction={currentAction}
        />
      )
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for account generation", async () => {
    const status = GENERATING_ACCOUNT;
    const currentAction = null;

    expect(
      shallow(
        <AccountCreationProgress
          status={status}
          currentAction={currentAction}
        />
      )
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for ETH funding", async () => {
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

  it("waiting for setup - waiting for MANA funding and marketplace approval", async () => {
    const status = FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE;
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

  it("waiting for setup - waiting for MANA funding", async () => {
    const status = FUNDING_WITH_MANA;
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

  it("waiting for setup - waiting for marketplace approval", async () => {
    const status = APPROVING_MARKETPLACE;
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

  it("final state - account ready", async () => {
    const status = READY_TO_USE;
    const currentAction = null;

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