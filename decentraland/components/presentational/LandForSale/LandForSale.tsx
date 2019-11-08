import React from "react";
import { StyleSheet, View } from "react-native";

import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "../Estate";
import Parcel from "../Parcel";
import LandForSaleInfo from "../LandForSaleInfo";
import AssetTypes from "../../../constants/AssetTypes";

const { ESTATE, PARCEL } = AssetTypes;

const styles = StyleSheet.create({
  landContainer: {
    width: responsiveWidth(95),
  },
});

interface LandForSaleObjectProps {
  asset: any;
  priceMana: number;
}

interface LandForSaleProps {
  landForSale: LandForSaleObjectProps;
}

const LandForSale: React.SFC<LandForSaleProps> = ({ landForSale }) => {
  const { asset } = landForSale;
  const { type } = asset;

  return (
    <View style={styles.landContainer}>
      {((): JSX.Element => {
        switch (type) {
          case ESTATE:
            return <Estate estate={asset} />;
          case PARCEL:
            return <Parcel parcel={asset} />;
        }
      })()}
      <LandForSaleInfo landForSale={landForSale} />
    </View>
  );
};

export default LandForSale;
