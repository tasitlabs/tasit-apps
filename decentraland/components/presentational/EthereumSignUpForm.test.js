import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUpForm from "./EthereumSignUpForm";
import { UsernameTextInput } from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  jest.useFakeTimers();
  let wrapper;
  let onSignUp;

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
    onSignUp = jest.fn();
    wrapper = shallow(<EthereumSignUpForm onSignUp={onSignUp} />);
  });

  it("renders the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("creates a wallet - calling function", () => {
    wrapper
      .find("Button")
      .find({ title: "Continue" })
      .simulate("press");

    expect(onSignUp.mock.calls.length).toBe(1);
  });

  describe("UsernameTextInput", () => {
    it("renders the component", async () => {
      const onChangeUsername = () => {};
      expect(
        shallow(
          <UsernameTextInput username="test4" onChange={onChangeUsername} />
        )
      ).toMatchSnapshot();
    });
  });
});
