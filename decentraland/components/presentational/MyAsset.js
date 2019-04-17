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

export default function MyAsset({ asset }) {
  const { type, actionId } = asset;
  let { name } = asset;
  if (!name) name = "(No name for this one right now)";

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
      <View style={styles.myAssetInfoContainer}>
        <View style={styles.nameContainer}>
          <AssetName asset={asset} />
        </View>
        <View style={styles.linkContainer}>
          <LinkToBlockchain actionId={actionId} />
        </View>
      </View>
    </View>
  );
}

MyAsset.propTypes = {
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
    //alignItems: "center",
    justifyContent: "flex-end",
  },
});
