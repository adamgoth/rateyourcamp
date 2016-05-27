import React from 'react';
import {
  MapView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Campsites from '../data/campsites';

module.exports = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  render() {
    var campsiteAnnos = Campsites.map(function(c) {
      return {
          longitude: c.longitude,
          latitude: c.latitude,
          title: c.sitename,
          rightCalloutView: (
            <TouchableOpacity
              onPress={() => this.props.navigator.push({name: 'campsite'})}>
              <Text>{'Details >'}</Text>
            </TouchableOpacity>
          )
        }
    }.bind(this));
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
        <View style={styles.bottomView}>
          <Text>YAY</Text>
        </View>
      </View>
    );
  },

  onRegionChangeComplete: function(region){
    console.log(region);
  },

  onDetailsPress: function() {
    console.log('hi');
    this.props.navigator.push({
      name: 'campsite'
    });
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
  },
  bottomView: {
    flex: 1,
  },
  detailsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'black',
  }
});
