import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyAssetsList from "@presentational/MyAssetsList";
import MyAssetsListItem from "@presentational/MyAssetsListItem";
//import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";
//import { listsAreEqual } from "@helpers";

export class MyAssetsScreen extends React.Component {
  // componentDidMount = async () => {
  //   const { account, myAssets: fromState } = this.props;
  //   const decentralandUtils = new DecentralandUtils();
  //   const { getAssetsOf } = decentralandUtils;
  //   if (account) {
  //     const { acountAddress } = account;
  //     const fromBlockchain = await getAssetsOf(acountAddress);
  //     const shouldUpdate = listsAreEqual(fromBlockchain, fromState);
  //     if (shouldUpdate) {
  //     }
  //   }
  // };

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

export default connect(mapStateToProps)(MyAssetsScreen);
