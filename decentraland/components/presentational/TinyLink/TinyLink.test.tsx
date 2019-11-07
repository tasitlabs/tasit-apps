import React from "react";
import { shallow } from "enzyme";
import TinyLink from "../TinyLink";

describe("TinyLink", () => {
  it("renders the component", () => {
    const url = "https://privacy.tasit.io/";
    const text = "Tasit privacy policy";
    expect(shallow(<TinyLink url={url} text={text} />)).toMatchSnapshot();
  });
});
