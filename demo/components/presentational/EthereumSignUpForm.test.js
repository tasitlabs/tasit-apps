import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { EthereumSignUpForm } from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  let wrapper;
  let afterSignUp;
  let setAccount;

  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();

    afterSignUp = jest.fn();
    setAccount = jest.fn();

    wrapper = shallow(
      <EthereumSignUpForm afterSignUp={afterSignUp} setAccount={setAccount} />
    );
  });

  it("renders the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("creates a wallet - calling function", () => {
    wrapper
      .find("Button")
      .find({ title: "Continue" })
      .simulate("press");

    const account = setAccount.mock.calls[0][0];

    expect(account.address).not.toEqual("");
    expect(afterSignUp.mock.calls.length).toBe(1);
    expect(setAccount.mock.calls.length).toBe(1);
  });
});
