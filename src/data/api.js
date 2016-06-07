module.exports = {
  campsiteDetail: function(id) {
    var url = `https://secure-mountain-79131.herokuapp.com/campsites/${id}`;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return {
          longitude: json.longitude,
          latitude: json.latitude,
          sitename: json.sitename,
          state: json.state,
          nearesttown: json.nearesttown,
          distancefromtown: json.distancefromtown,
          numberofsites: json.numberofsites,
          phone: json.phone,
          website: json.website
        };
      })
  },

  campsitesByState: function(state) {
    var capped = state.replace(/\w\S*/g, word => {return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();});
    var url = `https://secure-mountain-79131.herokuapp.com/campsites/state/${capped}`;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
  },

  allCampsites: function() {
    var url = 'https://secure-mountain-79131.herokuapp.com/campsites/';

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
  },

  campsiteReviews: function(id) {
    var url = `https://secure-mountain-79131.herokuapp.com/reviews/${id}`;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
  },

  postReview: function(user, rating, review, campsite_id) {
    var url = 'https://secure-mountain-79131.herokuapp.com/reviews';
    var formData = {
      user: user,
      rating: rating,
      review: review,
      campsite_id: campsite_id,
    }

    var formBody = [];
    for (var key in formData) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(formData[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
  }
}
