import React from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CampsitesMap from './src/components/campsitesMap';

var ROUTES = {
  campsitesMap: CampsitesMap,
}

var rateyourcamp = React.createClass({
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
    return <Component route={route} navigator={navigator} />;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('rateyourcamp', () => rateyourcamp);
