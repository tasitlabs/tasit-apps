import React from "react";
import { connect } from "react-redux";
import { setMyAssetsList } from "../redux/actions";
import PropTypes from "prop-types";
import MyAssetsList from "@presentational/MyAssetsList";
import MyAssetsListItem from "@presentational/MyAssetsListItem";
import { listsAreEqual } from "@helpers";
import { getAssetsOf } from "@helpers/decentraland";
import { storeMyAssets } from "@helpers/storage";

export class MyAssetsScreen extends React.Component {
  componentDidMount = async () => {
    const { account, myAssets: fromState, setMyAssetsList } = this.props;
    if (account) {
      const { address } = account;
      const fromBlockchain = await this._getAssetsFromBlockchain(address);
      const shouldUpdate = !listsAreEqual(fromBlockchain, fromState);
      if (shouldUpdate) {
        setMyAssetsList(fromBlockchain);
        storeMyAssets(fromBlockchain);
      }
    }
  };

  _getAssetsFromBlockchain = async address => {
    const listOfPromises = await getAssetsOf(address);
    const fromBlockchain = await Promise.all([...listOfPromises]);
    return fromBlockchain;
  };

  _renderItem = ({ item: asset }) => {
    return <MyAssetsListItem asset={asset} />;
  };

  render() {
    const { myAssets } = this.props;

    return (
      <MyAssetsList myAssetsList={myAssets} renderItem={this._renderItem} />
    );
  }
}

MyAssetsScreen.propTypes = {
  myAssets: PropTypes.array.isRequired,
  account: PropTypes.object,
};

const mapStateToProps = state => {
  const { myAssets, accountInfo } = state;
  const { account } = accountInfo;
  const { list: myAssetsList } = myAssets;
  return { myAssets: myAssetsList, account };
};

const mapDispatchToProps = {
  setMyAssetsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAssetsScreen);
