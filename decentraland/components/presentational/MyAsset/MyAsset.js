import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "@presentational/Estate";
import Parcel from "@presentational/Parcel";
import { ESTATE, PARCEL } from "@constants/AssetTypes";
import LinkToBlockchain from "@presentational/LinkToBlockchain";
import AssetName from "@presentational/AssetName";

export function MyAsset({ asset, userAction }) {
  const { type } = asset;

  return (
    <View style={styles.assetContainer}>
      {(() => {
        switch (type) {
          case ESTATE:
            return <Estate estate={asset} />;
          case PARCEL:
            return <Parcel parcel={asset} />;
        }
      })()}
      <MyAssetInfo asset={asset} userAction={userAction} />
    </View>
  );
}

MyAsset.propTypes = {
  asset: PropTypes.object.isRequired,
  userAction: PropTypes.object.isRequired,
};

export function MyAssetInfo({ asset, userAction }) {
  const { name } = asset;
  const [actionId] = Object.keys(userAction);

  return (
    <View style={styles.myAssetInfoContainer}>
      <View style={styles.nameContainer}>
        <AssetName name={name} />
      </View>
      <View style={styles.linkContainer}>
        <LinkToBlockchain actionId={actionId} />
      </View>
    </View>
  );
}

MyAssetInfo.propTypes = {
  asset: PropTypes.object.isRequired,
  userAction: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  assetContainer: {
    width: responsiveWidth(95),
  },
  linkContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  myAssetInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    flex: 1,
  },
});

export default MyAsset;
