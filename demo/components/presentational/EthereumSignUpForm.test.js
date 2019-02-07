import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUpForm from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    expect(
      shallow(<EthereumSignUpForm afterSignUp={() => {}} />)
    ).toMatchSnapshot();
  });

  it("creates a wallet - calling function", () => {
    const afterSignUp = jest.fn();
    const wrapper = shallow(<EthereumSignUpForm afterSignUp={afterSignUp} />);
    expect(wrapper.state("address")).toEqual("");
    wrapper
      .find("Button")
      .find({ title: "Continue" })
      .simulate("press");

    expect(wrapper.state("address")).not.toEqual("");
    expect(afterSignUp.mock.calls.length).toBe(1);
  });
});
