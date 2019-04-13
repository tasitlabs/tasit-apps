import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '@constants/Colors'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons';
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions'
import ActionStatus from '@constants/ActionStatus'

export default class MyAccountCreationStatusItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      status: props.status
    };
  }

  renderIcon(status) {
    if(status === ActionStatus.DONE) {
      return (
        <Ionicons name="md-checkmark" size={20} style={styles.actionStatusIcon} />
      );
    }
    if(status === ActionStatus.PENDING) {
      return (
        <Ionicons name="md-clock" size={20} style={styles.actionStatusIcon} />
      );
    }
    return (
      <Ionicons name="ios-close" size={20} style={styles.actionStatusIcon} />
    )
  }

  render () {
    const {name, status} = this.state;
    return (
      <View style={styles.container}>
        {this.renderIcon(status)}
        <Text style={styles.actionText}>{name}</Text>
      </View>
    )
  }

}

MyAccountCreationStatusItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ActionStatus)).isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1),
    height: responsiveHeight(10)
  },
  actionStatusIcon: {
    fontWeight: "800"
  },
  actionText: {
    fontSize: 16,
    fontWeight: "800",
    marginLeft: responsiveWidth(5)
  }

})
