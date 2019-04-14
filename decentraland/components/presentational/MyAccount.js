import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@constants/Colors';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyAccountCreationStatusItem from './MyAccountCreationStatusItem';
import ActionStatus from '@constants/ActionStatus';

export default function MyAccount ({progress, creationActions}) {

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        color={Colors.loadingColor}
        borderWidth={0}
        unfilledColor={Colors.textColor}
        height={responsiveHeight(1)}
        width={responsiveWidth(110)}
        style={styles.progress}
      />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>{progress * 100}% completed</Text>
      </View>
      <View style={styles.actionItemsContainer}>
        {
          creationActions.map((action) => {
            return (
              <MyAccountCreationStatusItem
                key={action.name}
                name={action.name}
                status={action.status}
              />
            );
          })
        }
      </View>
    </View>
  );
}

MyAccount.propTypes = {
  accountInfo: PropTypes.object,
  creationActions: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(Object.values(ActionStatus)),
      name: PropTypes.string
    })
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progress: {
    marginTop: responsiveHeight(10),
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(10),
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontWeight: '800',
  },
  actionItemsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(10),
  },
});
