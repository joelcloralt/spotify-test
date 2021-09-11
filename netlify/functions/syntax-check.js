const axios = require('axios');

exports.handler = async function (event, context) {

  const options = {
    method: 'GET'
  }
  try {
    const response = await axios.get('https://catfact.ninja/fact', options);
    const { data } = response;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data})
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