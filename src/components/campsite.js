import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Campsites from '../data/campsites';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigator.pop()}>
          <Text>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.siteText}>{this.props.sitename}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  siteText: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  backButton: {
    marginTop: 30
  }
});
