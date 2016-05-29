import React from 'react';
import {
  MapView,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Campsites from '../data/campsites';
import Regions from '../data/regions'

module.exports = React.createClass({
  getInitialState: function() {
    return {
      state: 'us',
      region: {longitudeDelta: 131.8359405964179, latitude: 52.49195113130104, longitude: -104.7812499009146, latitudeDelta: 69.54145563738211}
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
            onPress={() => this.props.navigator.push({
              name: 'campsite',
              passProps: {
                sitename: c.sitename
              }
            })}>
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
          region={this.state.region}
          style={styles.map}>
        </MapView>
        <View style={styles.bottomView}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.state}
            onValueChange={this.onPickerChange}>
            <Picker.Item label="All US" value={'us'} />
            <Picker.Item label="Colorado" value={'colorado'} />
            <Picker.Item label="Florida" value={'florida'} />
            <Picker.Item label="Illinois" value={'illinois'} />
            <Picker.Item label="Georgia" value={'georgia'} />
          </Picker>
        </View>
      </View>
    );
  },

  onPickerChange: function(stateValue) {
    this.setState({state: stateValue, region: Regions[stateValue]});
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
  },
  picker: {
    width: 250,
    alignSelf: 'center'
  }
});
