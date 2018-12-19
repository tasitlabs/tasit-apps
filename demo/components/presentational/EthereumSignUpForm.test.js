import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUpForm from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<EthereumSignUpForm />)).toMatchSnapshot();
  });

  it("creates a wallet - calling function", async () => {
    const wrapper = shallow(<EthereumSignUpForm />);
    expect(wrapper.state("address")).toEqual("");
    await wrapper.instance().createAccount();
    expect(wrapper.state("address")).not.toEqual("");
  });
});
