import React from "react";
import { shallow } from "enzyme";
import LandForSaleList from "./LandForSaleList";

describe("LandForSaleList", () => {
  describe("renders the component", () => {
    it("when list is empty and the loading is in progress", async () => {
      const landForSaleRenderer = () => {};
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

    it("after loaded an empty list", async () => {
      const landForSaleRenderer = () => {};
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
