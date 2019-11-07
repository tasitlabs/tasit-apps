import React from "react";
import { StyleSheet, View } from "react-native";

import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "../Estate";
import Parcel from "../Parcel";
import { ESTATE, PARCEL } from "../../../constants/AssetTypes";
import LinkToBlockchain from "../LinkToBlockchain";
import AssetName from "../AssetName";

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

interface AssetObjectProps {
  type: string;
}

interface MyAssetProps {
  asset: AssetObjectProps;
  userAction: object;
}

export const MyAsset: React.SFC<MyAssetProps> = ({ asset, userAction }) => {
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
};

interface AssetObjectInMyAssetInfoProps {
  name: string;
}

interface MyAssetInfoProps {
  asset: AssetObjectInMyAssetInfoProps;
  userAction: object;
}

export const MyAssetInfo: React.SFC<MyAssetInfoProps> = ({
  asset,
  userAction,
}) => {
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
};

export default MyAsset;
