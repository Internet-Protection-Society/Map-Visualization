import axios from 'axios';

export default class MapClient {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    return axios
      .get(this.url)
      .then(resp => resp.data)
      .catch(err => {
        console.error(err);
        return {};
      });
  }
}
