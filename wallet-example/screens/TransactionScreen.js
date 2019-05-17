import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";

export class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: "Transaction"
  };

  render() {
    const { transactions } = this.props;
    let transactionsString = "placeholder";
    try {
      console.log("# of transactions", transactions.length);
      transactionsString = JSON.stringify(transactions);
    } catch (error) {
      console.info("error", error);
    }
    return (
      <View style={styles.container}>
        <Text>{transactionsString}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionScreen);
