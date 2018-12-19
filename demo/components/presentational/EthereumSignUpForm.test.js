import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUpForm from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("creates a wallet - calling function", async () => {
    const wrapper = shallow(<EthereumSignUpForm />);
    expect(wrapper.state("address")).toEqual("");
    await wrapper.instance().handleAsync();
    expect(wrapper.state("address")).not.toEqual("");
  });

  it("creates a wallet - pressing sync button", async () => {
    const wrapper = shallow(<EthereumSignUpForm />);

    expect(wrapper.state("address")).toEqual("");

    wrapper
      .find("Button")
      .find({ title: "Sync" })
      .simulate("press");

    wrapper.update();

    expect(wrapper.state("address")).not.toEqual("");
  });

  it("creates a wallet - pressing async button (1)", async () => {
    const wrapper = shallow(<EthereumSignUpForm />);

    expect(wrapper.state("address")).toEqual("");

    wrapper
      .find("Button")
      .find({ title: "Aync" })
      .simulate("press");

    await Promise.resolve();

    wrapper.update();

    expect(wrapper.state("address")).not.toEqual("");
  });

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  it("creates a wallet - pressing async button (2.1)", async () => {
    jest.useFakeTimers();
    const wrapper = shallow(<EthereumSignUpForm />);

    expect(wrapper.state("address")).toEqual("");

    wrapper
      .find("Button")
      .find({ title: "Aync" })
      .simulate("press");

    await sleep(200);

    wrapper.update();

    expect(wrapper.state("address")).not.toEqual("");
  });

  it("creates a wallet - pressing async button (2.2)", async () => {
    jest.useRealTimers();
    const wrapper = shallow(<EthereumSignUpForm />);

    expect(wrapper.state("address")).toEqual("");

    wrapper
      .find("Button")
      .find({ title: "Aync" })
      .simulate("press");

    await sleep(200);

    wrapper.update();

    expect(wrapper.state("address")).not.toEqual("");
  });

  it("creates a wallet - pressing async button (3)", async () => {
    const wrapper = shallow(<EthereumSignUpForm />);

    expect(wrapper.state("address")).toEqual("");

    wrapper
      .find("Button")
      .find({ title: "Aync" })
      .simulate("press");

    await Promise.resolve();

    wrapper.update();

    expect(wrapper.state("address")).not.toEqual("");
  });
});
