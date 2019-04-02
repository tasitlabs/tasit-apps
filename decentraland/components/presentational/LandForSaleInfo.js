import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";
import { Button, Icon } from "native-base";
import { formatNumber } from "../../helpers";

const onPriceInfo = () => {
  const title = "";
  const message =
    "MANA is Decentraland’s fungible, ERC20 cryptocurrency token. MANA is burned or spent in exchange for LAND parcels. ";
  Alert.alert(title, message, [{ text: "Okay" }]);
};

export default function LandForSale({ landForSale }) {
  const { asset, priceMana } = landForSale;
  let { name } = asset;
  const price = formatNumber(priceMana);
  if (!name) name = "Land without name";

  // Note: Conversion to USD will be implemented on v0.2.0
  // <Text>{priceMana} MANA (~${landForSale.priceUSD})</Text>
  return (
    <View style={styles.landInfoContainer}>
      <View style={styles.landNameContainer}>
        <Text style={styles.landName}>{name}</Text>
      </View>
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
    </View>
  );
}

LandForSale.propTypes = {
  landForSale: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  landNameContainer: {
    width: responsiveWidth(50),
  },
  landName: {
    color: Colors.assetInfoText,
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
  },
});
