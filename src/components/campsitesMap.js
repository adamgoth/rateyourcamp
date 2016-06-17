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

import Regions from '../data/regions';
import API from '../data/api';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      searchTerm: '',
      state: 'colorado',
      region: {longitudeDelta: 10, latitude: 39.17581850567979, longitude: -105.5849862510766, latitudeDelta: 5.424471588580893},
    };
  },

  componentWillMount() {
    API.campsitesByState(this.state.state)
      .then((data) => {
        this.setState({
          annotations: data.map(function(c) {
            return {
              longitude: c.longitude,
              latitude: c.latitude,
              title: c.sitename,
              rightCalloutView: (
                <TouchableOpacity
                  onPress={() => this.props.navigator.push({
                    name: 'campsite',
                    passProps: {
                      sitename: c.sitename,
                      id: c._id
                    }
                  })}>
                  <Text>{'Details >'}</Text>
                </TouchableOpacity>
              )
            }
          }.bind(this))
      })
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={this.state.annotations}
          onRegionChangeComplete={this.onRegionChangeComplete}
          region={this.state.region}
          style={styles.map}>
        </MapView>
        <View style={styles.bottomView}>
        <Text style={styles.text}>Search by campsite name:</Text>
        <TextInput
          style={styles.searchBar}
          onChangeText={(text) => this.setState({searchTerm: text})}
          value={this.state.searchTerm}
        />
          <Picker
            style={styles.picker}
            selectedValue={this.state.state}
            onValueChange={this.onPickerChange}>
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
            <Picker.Item label="Michigan" value={'michigan'} />
            <Picker.Item label="Minnesota" value={'minnesota'} />
            <Picker.Item label="Mississippi" value={'mississippi'} />
            <Picker.Item label="Missouri" value={'missouri'} />
            <Picker.Item label="Montana" value={'montana'} />
            <Picker.Item label="Nebraska" value={'nebraska'} />
            <Picker.Item label="Nevada" value={'nevada'} />
            <Picker.Item label="New Hampshire" value={'new hampshire'} />
            <Picker.Item label="New Jersey" value={'new jersey'} />
            <Picker.Item label="New Mexico" value={'new mexico'} />
            <Picker.Item label="New York" value={'new york'} />
            <Picker.Item label="North Carolina" value={'north carolina'} />
            <Picker.Item label="North Dakota" value={'north dakota'} />
            <Picker.Item label="Ohio" value={'ohio'} />
            <Picker.Item label="Oklahoma" value={'oklahoma'} />
            <Picker.Item label="Oregon" value={'oregon'} />
            <Picker.Item label="Pennsylvania" value={'pennsylvania'} />
            <Picker.Item label="Rhode Island" value={'rhode island'} />
            <Picker.Item label="South Carolina" value={'south carolina'} />
            <Picker.Item label="South Dakota" value={'south dakota'} />
            <Picker.Item label="Tennessee" value={'tennessee'} />
            <Picker.Item label="Texas" value={'texas'} />
            <Picker.Item label="Utah" value={'utah'} />
            <Picker.Item label="Vermont" value={'vermont'} />
            <Picker.Item label="Virginia" value={'virginia'} />
            <Picker.Item label="Washington" value={'washington'} />
            <Picker.Item label="West Virginia" value={'west virginia'} />
            <Picker.Item label="Wisconsin" value={'wisconsin'} />
            <Picker.Item label="Wyoming" value={'wyoming'} />
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
    API.campsitesByState(this.state.state)
      .then((data) => {
        this.setState({
          annotations: data.map(function(c) {
            return {
              longitude: c.longitude,
              latitude: c.latitude,
              title: c.sitename,
              rightCalloutView: (
                <TouchableOpacity
                  onPress={() => this.props.navigator.push({
                    name: 'campsite',
                    passProps: {
                      sitename: c.sitename,
                      id: c._id
                    }
                  })}>
                  <Text>{'Details >'}</Text>
                </TouchableOpacity>
              )
            }
          }.bind(this))
      })
    })
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
    backgroundColor: '#F5FCFF',
  },
  searchBar: {
    marginTop: 5,
    padding: 10,
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    alignSelf: 'center'
  },
  map: {
    flex: 6,
    marginTop: 30,
  },
  bottomView: {
    flex: 5,
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
