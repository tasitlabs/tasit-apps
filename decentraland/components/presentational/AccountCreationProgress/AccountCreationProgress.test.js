import React from "react";
import { shallow } from "enzyme";
import {
  AccountCreationProgress,
  ProgressMessageAndLink,
} from "@presentational/AccountCreationProgress";
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
    const actions = {};

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for account generation", async () => {
    const status = GENERATING_ACCOUNT;
    const actions = {};

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for ETH funding", async () => {
    const status = FUNDING_WITH_ETH;
    const actionId = await anAction.getId();
    const actions = { FUNDING_WITH_ETH: actionId };

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for MANA funding and marketplace approval", async () => {
    const status = FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE;
    const actionId = await anAction.getId();
    const actions = {
      FUNDING_WITH_MANA: actionId,
      APPROVING_MARKETPLACE: actionId,
    };

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for MANA funding", async () => {
    const status = FUNDING_WITH_MANA;
    const actionId = await anAction.getId();
    const actions = { FUNDING_WITH_MANA: actionId };

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("waiting for setup - waiting for marketplace approval", async () => {
    const status = APPROVING_MARKETPLACE;
    const actionId = await anAction.getId();
    const actions = { APPROVING_MARKETPLACE: actionId };

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  it("final state - account ready", async () => {
    const status = READY_TO_USE;
    const actions = {};

    expect(
      shallow(<AccountCreationProgress status={status} actions={actions} />)
    ).toMatchSnapshot();
  });

  describe("ProgressMessageAndLink", () => {
    it("with a message and without an action", async () => {
      const waitingMessage = "A waiting message.";
      const actionId = null;

      expect(
        shallow(
          <ProgressMessageAndLink
            waitingMessage={waitingMessage}
            actionId={actionId}
          />
        )
      ).toMatchSnapshot();
    });

    it("with a message and with an action", async () => {
      const waitingMessage = "A waiting message.";
      const actionId = await anAction.getId();

      expect(
        shallow(
          <ProgressMessageAndLink
            waitingMessage={waitingMessage}
            actionId={actionId}
          />
        )
      ).toMatchSnapshot();
    });

    it("without a message nor action", async () => {
      const waitingMessage = null;
      const actionId = null;

      expect(
        shallow(
          <ProgressMessageAndLink
            waitingMessage={waitingMessage}
            actionId={actionId}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
