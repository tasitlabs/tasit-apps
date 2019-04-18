import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "./Estate";
import Parcel from "./Parcel";
import AssetTypes from "@constants/AssetTypes";
import LinkToBlockchain from "./LinkToBlockchain";
import AssetName from "./AssetName";

const { ESTATE, PARCEL } = AssetTypes;

export function MyAsset({ asset }) {
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
    </View>
  );
}

MyAsset.propTypes = {
  asset: PropTypes.object.isRequired,
};

export function MyAssetInfo({ asset }) {
  const { actionId, name } = asset;

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
};

const styles = StyleSheet.create({
  myAssetInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  assetContainer: {
    width: responsiveWidth(95),
  },
  nameContainer: {
    flex: 1,
  },
  linkContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default MyAsset;
