const { default: axios } = require("axios");

const getGooglePlace = (category, radius, lat, lng, pagetoken = '') =>
  axios.get('/api/google-place', {
    params: {
      category,
      radius,
      lat,
      lng,
      pagetoken,
    },
  });

export default { getGooglePlace };