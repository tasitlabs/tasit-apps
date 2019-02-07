import React from "react";
import { shallow } from "enzyme";
import Estate from "./Estate";

describe("Estate", () => {
  it("renders the component", async () => {
    const estate = {
      id: 123,
      name: "Not found",
      img: "https://decentraland.org/images/logo-65f7b27caf.png",
    };
    expect(shallow(<Estate estate={estate} />)).toMatchSnapshot();
  });
});
