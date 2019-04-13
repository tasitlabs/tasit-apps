import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '@constants/Colors'
import ProgressBar from 'react-native-progress/Bar'
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions'
import MyAccountCreationStatusItem from './MyAccountCreationStatusItem'
import ActionStatus from '@constants/ActionStatus'

export default class MyAccount extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <ProgressBar
          progress={0.4}
          color={Colors.loadingColor}
          borderWidth={0}
          unfilledColor={Colors.textColor}
          height={responsiveHeight(1)}
          width={responsiveWidth(110)}
          style={styles.progress}
        />
        <View style={styles.progressTextContainer}>
          <Text style={{fontWeight: '800'}}>40% completed</Text>
        </View>
        <View style={styles.actionItemsContainer}>
          <MyAccountCreationStatusItem name="Account created" status={ActionStatus.DONE}/>
          <MyAccountCreationStatusItem name="Funded with ETH" status={ActionStatus.DONE}/>
          <MyAccountCreationStatusItem name="Funded with MANA tokens" status={ActionStatus.PENDING}/>
          <MyAccountCreationStatusItem name="Linked with marketplace" status={ActionStatus.MISSING}/>
        </View>
      </View>
    )
  }

}

MyAccount.propTypes = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progress: {
    marginTop: responsiveHeight(10)
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionItemsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(10)
  }
})
