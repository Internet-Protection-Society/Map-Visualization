import axios from 'axios';

/**
 * Client which fetch json data from Google Sheets configured to be
 * [JSON endpoint]
 * {@link https://developers.google.com/gdata/samples/spreadsheet_sample}.
 * @param {function} dataHandler - should be implemented by user to process data
 * and return it in specific format. If data handler will not be provided,
 * response data field will be returned.
 * @param {function} errorHandler - should be implemented by user to process
 * error. If no error handler be provided, {@function getData} will return
 * empty map.
 */
export default class GShitsClient {
  constructor(url, dataHandler, errorHandler) {
    this.url = url;
    this.dataHandler = dataHandler;
    this.errorHandler = errorHandler == null ? () => ({}) : errorHandler;
  }

  async getData() {
    return axios
      .get(this.url)
      .then(resp => this.dataHandler(resp.data))
      .catch(err => this.errorHandler(err));
  }
}
