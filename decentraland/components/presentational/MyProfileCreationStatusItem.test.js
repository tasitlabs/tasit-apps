import React from "react";
import { shallow } from "enzyme";
import ActionStatus from "../../constants/ActionStatus";
import MyAccountCreationStatusItem from "./MyAccountCreationStatusItem";

describe("MyAccountCreationStatusItem", () => {
  it("renders the component with done status", async () => {
    const name = "test";
    expect(
      shallow(
        <MyAccountCreationStatusItem name={name} status={ActionStatus.DONE} />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with missing status", async () => {
    const name = "test";
    expect(
      shallow(
        <MyAccountCreationStatusItem
          name={name}
          status={ActionStatus.MISSING}
        />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with pending status", async () => {
    const name = "test";
    expect(
      shallow(
        <MyAccountCreationStatusItem
          name={name}
          status={ActionStatus.PENDING}
        />
      )
    ).toMatchSnapshot();
  });
});
