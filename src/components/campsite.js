import React from 'react';
import {
  MapView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import API from '../data/api';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      sitename: '',
      longitude: 0,
      longitudeDelta: .3,
      latitude: 0,
      latitudeDelta: .3
    }
  },

  componentWillMount() {
    API.campsiteDetail(this.props.id)
      .then((data) => {
        this.setState(data);
      })
  },

  render: function() {
    //var mockedCampsite = {"_id":"571acfb2d2a89ea2bdba4f7a","sitename":"Alder Dune","nearesttown":"Florence","state":"Oregon","country":"USA","website":"","region":"West","longitude":-124.102,"latitude":44.069,"phone":"541.563.3211/541.750.7000","numberofsites":43,"distancefromtown":6};
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigator.pop()}>
          <Text>{'< Back'}</Text>
        </TouchableOpacity>
        <MapView
          annotations={[{longitude: this.state.longitude, latitude: this.state.latitude}]}
          region={{longitudeDelta: this.state.longitudeDelta, latitudeDelta: this.state.latitudeDelta, longitude: this.state.longitude, latitude: this.state.latitude}}
          style={styles.map}>
        </MapView>
        <View style={styles.campsiteInfo}>
          <Text style={styles.siteText}>{this.state.sitename}</Text>
          <Text style={styles.siteText}>Located {this.state.distancefromtown} miles from {this.state.nearesttown}, {this.state.state}</Text>
          <Text style={styles.siteText}>Number of reviews: 3</Text>
          <Text style={styles.siteText}>Average rating: 3</Text>
          <Text style={styles.siteText}>Number of campsites: {this.state.numberofsites}</Text>
          <Text style={styles.siteText}>Phone: {this.state.phone}</Text>
          <Text style={styles.siteText}>Website: {this.state.website}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginTop: 5,
  },
  campsiteInfo: {
    flex: 1,
  },
  siteText: {
    alignSelf: 'center',
    marginTop: 5,
  },
  backButton: {
    marginTop: 30
  }
});
