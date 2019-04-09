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

const onPriceInfo = () => {
  const title = "";
  const message = `MANA is Decentraland’s cryptocurrency token. You can use MANA to buy LAND parcels.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

export default function LandForSaleInfo({ landForSale }) {
  const { asset, priceMana } = landForSale;
  let { name } = asset;
  const price = formatNumber(priceMana);
  if (!name) name = "(No name for this one right now)";

  // Note: Conversion to USD will be implemented on v0.2.0
  // <Text>{priceMana} MANA (~${landForSale.priceUSD})</Text>
  return (
    <View style={styles.landInfoContainer}>
      <View style={styles.landNameContainer}>
        <Text style={styles.landName}>{name}</Text>
      </View>
      <LandForSalePrice price={price} />
    </View>
  );
}

LandForSaleInfo.propTypes = {
  landForSale: PropTypes.object.isRequired,
};

function LandForSalePrice({ price }) {
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
        <Text style={styles.landPrice}>{price}</Text>
      </View>
    </View>
  );
}

LandForSalePrice.propTypes = {
  price: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  landInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // One alternate approach to consider here is if there were two containers
  // that both flex to fill the size they're in following a 1:1 ratio.
  landNameContainer: {
    width: responsiveWidth(50),
    paddingTop: responsiveHeight(1),
  },
  landName: {
    color: Colors.assetInfoText,
    fontWeight: "bold",
  },
  landPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
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
