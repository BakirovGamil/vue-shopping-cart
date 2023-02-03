import axios from 'axios';

const productsUrl = new URL('http://localhost:3000/data');

export default class ProductApi {
  static getProducts() {
    const response = axios.get(productsUrl.toString());

    return response;
  }
}