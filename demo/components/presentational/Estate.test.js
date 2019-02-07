import React from "react";
import { shallow } from "enzyme";
import EstateForSale from "./EstateForSale";

describe("EstateForSale", () => {
  it("renders the component", async () => {
    const estate = {
      id: 123,
      name: "Not found",
      img: "https://decentraland.org/images/logo-65f7b27caf.png",
    };
    expect(shallow(<EstateForSale estate={estate} />)).toMatchSnapshot();
  });
});
