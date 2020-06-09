import React from "react";
import { shallow } from "enzyme";
import ActionStatus from "../../../constants/ActionStatus";
import MyProfileCreationStatusItem from "../MyProfileCreationStatusItem";

describe("MyProfileCreationStatusItem", () => {
  it("renders the component with done status", () => {
    const name = "test";
    expect(
      shallow(
        <MyProfileCreationStatusItem name={name} status={ActionStatus.DONE} />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with missing status", () => {
    const name = "test";
    expect(
      shallow(
        <MyProfileCreationStatusItem
          name={name}
          status={ActionStatus.MISSING}
        />
      )
    ).toMatchSnapshot();
  });

  it("renders the component with pending status", () => {
    const name = "test";
    expect(
      shallow(
        <MyProfileCreationStatusItem
          name={name}
          status={ActionStatus.PENDING}
        />
      )
    ).toMatchSnapshot();
  });
});
