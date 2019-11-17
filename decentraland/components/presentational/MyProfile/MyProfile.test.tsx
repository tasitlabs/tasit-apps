import React from "react";
import { shallow } from "enzyme";
import MyProfile from "../MyProfile";
import { accountCreationSteps } from "../../../helpers/testHelpers";

describe("MyProfile", () => {
  it("renders the component", () => {
    const progress = 0.5;
    const onConnectClick = (): void => {};
    const onUpgradeSecurityClick = (): void => {};
    expect(
      shallow(
        <MyProfile
          onConnectClick={onConnectClick}
          onUpgradeSecurityClick={onUpgradeSecurityClick}
          progress={progress}
          creationSteps={accountCreationSteps}
        />
      )
    ).toMatchSnapshot();
  });
});
