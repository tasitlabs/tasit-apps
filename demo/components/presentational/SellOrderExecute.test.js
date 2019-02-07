import React from "react";
import { shallow } from "enzyme";
import SellOrderExecute from "./SellOrderExecute";

describe("SellOrderExecute", () => {
  it("renders the component", async () => {
    expect(
      shallow(<SellOrderExecute sellOrder={{}} onOrderExecution={() => {}} />)
    ).toMatchSnapshot();
  });
});
