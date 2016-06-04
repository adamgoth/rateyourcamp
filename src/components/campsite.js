import React from 'react';
import {
  MapView,
  ScrollView,
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
      longitudeDelta: .015,
      latitude: 0,
      latitudeDelta: .015,
      reviews: [],
    }
  },

  componentWillMount() {
    API.campsiteDetail(this.props.id)
      .then(data => {
        this.setState(data);
      })
    API.campsiteReviews(this.props.id)
      .then(data => {
        this.setState({reviews: data})
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
          <Text style={styles.bold}>{this.state.sitename}</Text>
          <Text>Located {this.state.distancefromtown} miles from {this.state.nearesttown}, {this.state.state}</Text>
          <Text><Text style={styles.bold}>Longitude:</Text> {this.state.longitude} <Text style={styles.bold}>Latitude:</Text> {this.state.latitude}</Text>
          <Text><Text style={styles.bold}>Number of campsites:</Text> {this.state.numberofsites}</Text>
          <Text><Text style={styles.bold}>Phone:</Text> {this.state.phone}</Text>
          <Text><Text style={styles.bold}>Website:</Text> {this.state.website}</Text>
          <Text><Text style={styles.bold}>Number of reviews: </Text>{this.state.reviews.length}</Text>
          <Text><Text style={styles.bold}>Average rating:</Text> ?</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {this.state.reviews.map(review => {
            return (
              <View>
                <View style={styles.wrapper}>
                  <Text><Text style={styles.bold}>User:</Text> {review.user}</Text>
                  <Text><Text style={styles.bold}>Rating:</Text> {review.rating}</Text>
                  <Text style={{fontStyle: 'italic'}}>Two days ago</Text>
                </View>
                <Text style={styles.reviewText}>{review.review}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 5,
    marginTop: 5,
  },
  campsiteInfo: {
    flex: 4,
    backgroundColor: '#F2FCF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30
  },
  scrollView: {
    flex: 7,
    height: 300,
    backgroundColor: '#F5FCFF',
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  scrollViewContent: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  reviewText: {
    marginBottom: 15,
    padding: 7,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
