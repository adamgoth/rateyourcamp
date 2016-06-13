import React from 'react';
import {
  MapView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import API from '../data/api';
import moment from 'moment';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      sitename: '',
      longitude: 0,
      longitudeDelta: .01,
      latitude: 0,
      latitudeDelta: .01,
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

  averageRating: function(reviews) {
    console.log(reviews);
    if (reviews.length === 0)
      return "n/a"
    var total = reviews.map(obj => { return obj.rating }).reduce((a,b) => { return a + b })
    console.log(typeof total);
    console.log(typeof reviews.length);
    return Number(total) / Number(reviews.length)
  },

  render: function() {
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
          <Text><Text style={styles.bold}>Average rating:</Text> {this.averageRating(this.state.reviews)} out of 5</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <TouchableHighlight
            style={styles.reviewButton}
            onPress={() => this.props.navigator.push({
              name: 'reviewForm',
              passProps: {
                id: this.props.id,
                sitename: this.state.sitename,
              }
            })}
            underlayColor='green'>
            <Text style={styles.reviewButtonText}>Camped here? Leave a Review!</Text>
          </TouchableHighlight>
          {this.state.reviews.reverse().map(review => {
            return (
              <View key={review._id}>
                <View style={styles.wrapper}>
                  <Text><Text style={styles.bold}>User:</Text> {review.user}</Text>
                  <Text><Text style={styles.bold}>Rating:</Text> {review.rating}</Text>
                  <Text style={{fontStyle: 'italic'}}>{moment(review.created_on).format('YYYY-DD-MM')}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30
  },
  reviewButton: {
    alignSelf: 'center',
    backgroundColor: '#5cb85c',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5cb85c',
    marginBottom: 10,
    padding: 5,
  },
  reviewButtonText: {
    color: 'white',
  },
  scrollView: {
    flex: 7,
    height: 300,
    backgroundColor: '#F5FCFF',
  },
  scrollViewContent: {
    marginTop: 10,
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
