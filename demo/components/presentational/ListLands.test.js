import React from "react";
import { shallow } from "enzyme";
import ListLands from "./ListLands";

describe("ListLands", () => {
  it("renders the component", async () => {
    expect(
      shallow(<ListLands dataSource={{}} renderRow={() => {}} />)
    ).toMatchSnapshot();
  });
});
