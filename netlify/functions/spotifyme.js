const axios = require('axios');
const { getSecrets } = require('@netlify/functions');

exports.handler = async function (event, context) {
  //load the secrets enabled via Netlify Auth Management
  const secrets = await getSecrets();
  console.log("THE SECRETS", secrets);

    // ensure that Spotify auth is enabled for this site
  if (!secrets.spotify || !secrets.spotify.bearerToken) {
    return {
      statusCode: 412,
      body: JSON.stringify({
        error:
          'You must enable Spotify auth in your Netlify dashboard: https://app.netlify.com/user/labs',
      }),
    };
  }

    console.log("THERE IS A BEARERTOKEN", secrets);


  const API_URL = 'https://api.spotify.com/v1/me';

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secrets.spotify.bearerToken}`
    }
  }
  try {
    const response = await axios.get(API_URL, options);
    console.log("SUCCESS IN REQUEST", response);
    const {data} = response;
    console.log("SUCCESS IN REQUEST", data);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.log("ERROR IN REQUEST", error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}