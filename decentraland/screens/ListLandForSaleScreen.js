import React from "react";
import { connect } from "react-redux";
import {
  appendLandForSaleToList,
  selectLandToBuy,
  setLoadingAssetsForSaleInProgress,
} from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { showError, showInfo } from "@helpers";
import { loadAssetsForSale } from "@helpers/decentraland";
import { Root } from "native-base";

export class ListLandForSaleScreen extends React.Component {
  componentDidMount = async () => {
    try {
      showInfo("Loading land for sale...");
      await loadAssetsForSale();
    } catch (err) {
      showError(err);
    }
  };

  _renderItem = ({ item: landForSale }) => {
    const { navigation, selectLandToBuy } = this.props;
    const handlePress = () => {
      selectLandToBuy(landForSale);
      navigation.navigate("BuyLandScreen");
    };

    return (
      <LandForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  render() {
    const { assetsForSale } = this.props;
    const { list, loadingInProgress } = assetsForSale;

    // Note: The initial route component from react-navigation
    // Should add the NativaBase `Root` component.
    // See more: https://github.com/tasitlabs/tasit/pull/237#issuecomment-479124236
    // Tech debt: Move from here to the App.js component.
    return (
      <Root>
        <LandForSaleList
          landForSaleList={list}
          renderItem={this._renderItem}
          loadingInProgress={loadingInProgress}
        />
      </Root>
    );
  }
}

ListLandForSaleScreen.propTypes = {
  assetsForSale: PropTypes.object.isRequired,
  appendLandForSaleToList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
  setLoadingAssetsForSaleInProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { assetsForSale } = state;
  return { assetsForSale };
};

const mapDispatchToProps = {
  appendLandForSaleToList,
  setLoadingAssetsForSaleInProgress,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
