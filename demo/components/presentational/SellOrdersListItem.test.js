import React from "react";
import { shallow } from "enzyme";
import SellOrdersListItem from "./SellOrdersListItem";

describe("SellOrdersListItem", () => {
  it("renders the component", async () => {
    expect(
      shallow(<SellOrdersListItem land={{}} onPress={() => {}} />)
    ).toMatchSnapshot();
  });
});
