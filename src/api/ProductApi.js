import axios from 'axios';

const productsUrl = new URL('/.netlify/functions/get-products', window.location.href);

export default class ProductApi {
  static getProducts() {
    const response = axios.get(productsUrl.toString());

    return response;
  }
}