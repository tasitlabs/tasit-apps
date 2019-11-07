import React from "react";
import { shallow } from "enzyme";
import Parcel from "../Parcel";

describe("Parcel", () => {
  it("renders the component", async () => {
    const parcel = {
      id: 123,
      name: "Not found",
      img: "https://decentraland.org/images/logo-65f7b27caf.png",
    };
    expect(shallow(<Parcel parcel={parcel} />)).toMatchSnapshot();
  });
});
