import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyAssetsList from "@presentational/MyAssetsList";
import MyAssetsListItem from "@presentational/MyAssetsListItem";

export class MyAssetsScreen extends React.Component {
  _renderItem = ({ item: asset }) => {
    return <MyAssetsListItem asset={asset} />;
  };

  render() {
    const { myAssets } = this.props;
    const { list } = myAssets;

    return <MyAssetsList myAssetsList={list} renderItem={this._renderItem} />;
  }
}

MyAssetsScreen.propTypes = {
  myAssets: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { myAssets } = state;
  return { myAssets };
};

export default connect(mapStateToProps)(MyAssetsScreen);
