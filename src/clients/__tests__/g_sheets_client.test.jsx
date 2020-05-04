import 'regenerator-runtime/runtime';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import axios from 'axios';
import MockAxios from 'axios-mock-adapter';
import GShitsClient from '../g_sheets_client';

const url =
  'https://spreadsheets.google.com/feeds/cells/' +
  '1Ak5b1x9Qf7yDw9f3uXliCG3PghE1JpJwPUGhsGF2VoE/1/public/full?alt=json';
let mock;
let spy;
let unit;

describe('Google sheets client', () => {
  beforeEach(() => {
    mock = new MockAxios(axios);
    spy = jest.spyOn(axios, 'get');
    unit = new GShitsClient(url);
  });

  afterEach(() => {
    expect(spy).toHaveBeenCalled();
    mock.restore();
  });

  it('should successfully fetch empty data', async () => {
    mock.onGet(url).replyOnce(200, {});

    const data = await unit.getData();
    expect(data).toStrictEqual({});
  });

  it('should fail to fetch data and return empty map', async () => {
    mock.onGet(url).replyOnce(500);

    const data = await unit.getData();
    expect(data).toStrictEqual({});
  });

  it('should fetch all data and return only required fields', async () => {
    const resultedData = {
      required: 'Look at me, I am important',
      notRequired: 'Who am I? Where I am?',
    };
    const expectedData = {
      required: 'Look at me, I am important',
    };
    mock.onGet(url).replyOnce(200, resultedData);

    const dummyHandler = d => ({ required: d.required });
    unit = new GShitsClient(url, dummyHandler);

    const data = await unit.getData();
    expect(data).toStrictEqual(expectedData);
  });

  it('should fail to fetch data and return error message', async () => {
    mock.onGet(url).replyOnce(500);

    const expectedError = { error: 'Hahahaha, I break everything!' };
    const dummyErrorHandler = () => expectedError;
    unit = new GShitsClient(url, d => d, dummyErrorHandler);

    const data = await unit.getData();
    expect(data).toStrictEqual(expectedError);
  });
});
