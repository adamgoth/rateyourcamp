import React from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CampsitesMap from './components/campsitesMap';
import Campsite from './components/campsite';
import ReviewForm from './components/reviewForm';

var ROUTES = {
  campsitesMap: CampsitesMap,
  campsite: Campsite,
  reviewForm: ReviewForm,
};

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'campsitesMap'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} {...route.passProps} />;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
