import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      rating: '',
      review: '',
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigator.pop()}>
          <Text>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={styles.reviewForm}>
          <Text style={styles.sitenameText}>{this.props.sitename}</Text>
          <Text>What is your name?</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
          <Text>Rating:</Text>
          <TextInput
            style={styles.input}
            onChangeText={rating => this.setState({rating})}
            value={this.state.rating}
          />
          <Text>What did you think of this campsite?</Text>
          <TextInput
            style={[styles.input, {height: 120}]}
            onChangeText={review => this.setState({review})}
            value={this.state.review}
            multiline={true}
          />
          <TouchableHighlight
            style={styles.submitButton}
            onPress={() => { console.log("lol") }}
            underlayColor='green'>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginTop: 30
  },
  reviewForm: {
    justifyContent: 'center',
    marginTop: 60,
    alignItems: 'center'
  },
  sitenameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 30,
    width: 250,
    fontSize: 14,
    alignSelf: 'center'
  },
  submitButton: {
    borderColor: '#5cb85c',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#5cb85c',
    padding: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
  },
});
