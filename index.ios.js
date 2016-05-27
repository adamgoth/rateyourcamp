import React from 'react';
import {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Campsites from './ios/src/data/campsites';

var rateyourcamp = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  render() {
    var campsiteAnnos = Campsites.map(function(c) {
      return {longitude: c.longitude, latitude: c.latitude, title: c.sitename}
    });
    return (
      <View style={styles.container}>
        <MapView
          annotations={campsiteAnnos}
          onRegionChangeComplete={this.onRegionChangeComplete}
          region={
            {
              latitude: 48,
              longitude: -109,
              latitudeDelta: 80,
              longitudeDelta: 125
            }
          }
          style={styles.map}>
        </MapView>
      </View>
    );
  },

  onRegionChangeComplete: function(region){
    console.log(region);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  map: {
    flex: 1,
    marginTop: 30
  }
});

AppRegistry.registerComponent('rateyourcamp', () => rateyourcamp);
