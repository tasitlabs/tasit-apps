import React from "react";
import { shallow } from "enzyme";
import LandForSaleList from "./LandForSaleList";

describe("LandForSaleList", () => {
  it("renders the component", async () => {
    const landForSaleRenderer = () => {};
    const landForSaleList = [];
    expect(
      shallow(
        <LandForSaleList
          landForSaleList={landForSaleList}
          renderItem={landForSaleRenderer}
        />
      )
    ).toMatchSnapshot();
  });
});
