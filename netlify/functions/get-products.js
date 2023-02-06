import data from '../../src/assets/json/products.json';

// eslint-disable-next-line no-undef
exports.handler = async () => {
  try {
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};