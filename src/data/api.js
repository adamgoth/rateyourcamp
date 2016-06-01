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

  allCampsites: function() {
    var url = 'https://secure-mountain-79131.herokuapp.com/campsites';

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
  }
}
