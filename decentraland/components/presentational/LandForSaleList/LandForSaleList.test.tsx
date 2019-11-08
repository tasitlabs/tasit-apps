import React from "react";
import { shallow } from "enzyme";
import LandForSaleList from "../LandForSaleList";

describe("LandForSaleList", () => {
  describe("renders the component", () => {
    const landForSaleRenderer = (): JSX.Element => {
      return <></>;
    };

    it("when list is empty and the loading is in progress", () => {
      const landForSaleList = [];
      const loadingInProgress = true;
      expect(
        shallow(
          <LandForSaleList
            landForSaleList={landForSaleList}
            renderItem={landForSaleRenderer}
            loadingInProgress={loadingInProgress}
          />
        )
      ).toMatchSnapshot();
    });

    it("after having loaded an empty list", () => {
      const landForSaleList = [];
      const loadingInProgress = false;
      expect(
        shallow(
          <LandForSaleList
            landForSaleList={landForSaleList}
            renderItem={landForSaleRenderer}
            loadingInProgress={loadingInProgress}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
