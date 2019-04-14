import React from "react";
import { shallow } from "enzyme";
import MyAccount from "./MyAccount";
import { accountCreationActions } from "../../helpers/testHelpers";

describe("MyAccount", () => {
  it("renders the component", async () => {
    expect(
      shallow(
        <MyAccount progress={0.5} creationActions={accountCreationActions} />
      )
    ).toMatchSnapshot();
  });
});
