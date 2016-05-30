import React from 'react';
import {
  MapView,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Campsites from '../data/campsites';
import Regions from '../data/regions'

module.exports = React.createClass({
  getInitialState: function() {
    return {
      searchTerm: '',
      state: 'us',
      region: {longitudeDelta: 131.8359405964179, latitude: 52.49195113130104, longitude: -104.7812499009146, latitudeDelta: 69.54145563738211},
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
        <TextInput
          style={styles.searchBar}
          defaultValue="Search by campsite name..."
          onChangeText={(text) => this.setState({searchTerm: text})}
          value={this.state.searchTerm}
        />
          <Picker
            style={styles.picker}
            selectedValue={this.state.state}
            onValueChange={this.onPickerChange}>
            <Picker.Item label="All US" value={'us'} />
            <Picker.Item label="Alabama" value={'alabama'} />
            <Picker.Item label="Alaska" value={'alaska'} />
            <Picker.Item label="Arizona" value={'arizona'} />
            <Picker.Item label="Arkansas" value={'arkansas'} />
            <Picker.Item label="California" value={'california'} />
            <Picker.Item label="Colorado" value={'colorado'} />
            <Picker.Item label="Connecticut" value={'connecticut'} />
            <Picker.Item label="Delaware" value={'delaware'} />
            <Picker.Item label="Florida" value={'florida'} />
            <Picker.Item label="Illinois" value={'illinois'} />
            <Picker.Item label="Indiana" value={'indiana'} />
            <Picker.Item label="Iowa" value={'iowa'} />
            <Picker.Item label="Georgia" value={'georgia'} />
            <Picker.Item label="Hawaii" value={'hawaii'} />
            <Picker.Item label="Idaho" value={'idaho'} />
            <Picker.Item label="Kansas" value={'kansas'} />
            <Picker.Item label="Kentucky" value={'kentucky'} />
            <Picker.Item label="Louisiana" value={'louisiana'} />
            <Picker.Item label="Maine" value={'maine'} />
            <Picker.Item label="Maryland" value={'maryland'} />
            <Picker.Item label="Massachusetts" value={'massachusetts'} />
            <Picker.Item label="New Mexico" value={'new mexico'} />
            <Picker.Item label="Utah" value={'utah'} />
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
  searchBar: {
    padding: 10,
    marginTop: 20,
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  map: {
    flex: 4,
    marginTop: 30
  },
  bottomView: {
    flex: 3,
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
