import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";
import { Button, Icon } from "native-base";
import { formatNumber } from "@helpers";
import AssetName from "./AssetName";

const onPriceInfo = () => {
  const title = "";
  const message = `MANA is Decentraland’s cryptocurrency token. You can use MANA to buy LAND parcels.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

export function LandForSaleInfo({ landForSale }) {
  const { asset } = landForSale;
  const { priceMana } = landForSale;

  return (
    <View style={styles.landInfoContainer}>
      <View style={styles.nameContainer}>
        <AssetName asset={asset} />
      </View>
      <View style={styles.priceContainer}>
        <ManaPrice price={priceMana} />
      </View>
    </View>
  );
}

LandForSaleInfo.propTypes = {
  landForSale: PropTypes.object.isRequired,
};

export function ManaPrice({ price }) {
  const formattedPrice = formatNumber(price);

  return (
    <View style={styles.landPriceContainer}>
      <View>
        <Button small transparent onPress={onPriceInfo}>
          <Icon
            name="information-circle-outline"
            style={styles.landPriceIcon}
          />
        </Button>
      </View>
      <View>
        <Text style={styles.landPrice}>{formattedPrice}</Text>
      </View>
    </View>
  );
}

ManaPrice.propTypes = {
  price: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  landInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  landPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nameContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
  },
  landPriceIcon: {
    marginLeft: responsiveWidth(1.5),
    marginRight: responsiveWidth(1.5),
  },
  landPrice: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    color: Colors.assetInfoText,
    paddingTop: responsiveHeight(0.4),
  },
});

export default LandForSaleInfo;
