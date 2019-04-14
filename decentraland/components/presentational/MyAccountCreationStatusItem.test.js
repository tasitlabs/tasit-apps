import React from "react";
import { shallow } from "enzyme";
import ActionStatus from "../../constants/ActionStatus";
import MyAccountCreationStatusItem from "./MyAccountCreationStatusItem";

describe("MyAccountCreationStatusItem", () => {
  it("renders the component with done status", async () => {
    expect(
      shallow(
        <MyAccountCreationStatusItem name="test" status={ActionStatus.DONE} />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with missing status", async () => {
    expect(
      shallow(
        <MyAccountCreationStatusItem
          name="test"
          status={ActionStatus.MISSING}
        />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with pending status", async () => {
    expect(
      shallow(
        <MyAccountCreationStatusItem
          name="test"
          status={ActionStatus.PENDING}
        />
      )
    ).toMatchSnapshot();
  });
});
