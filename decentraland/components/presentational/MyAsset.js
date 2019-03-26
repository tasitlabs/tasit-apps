import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "./Estate";
import Parcel from "./Parcel";
import AssetTypes from "@constants/AssetTypes";

const { ESTATE, PARCEL } = AssetTypes;

export default function MyAsset({ asset }) {
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

const styles = StyleSheet.create({
  assetContainer: {
    width: responsiveWidth(95),
  },
});
