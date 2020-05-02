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
import MapClient from '../map_client';

const url =
  'https://spreadsheets.google.com/feeds/cells/' +
  '1Ak5b1x9Qf7yDw9f3uXliCG3PghE1JpJwPUGhsGF2VoE/1/public/full?alt=json';
let mock;
let spy;
let unit;

describe('Map client', () => {
  beforeEach(() => {
    mock = new MockAxios(axios);
    spy = jest.spyOn(axios, 'get');
    unit = new MapClient(url);
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

  it('should fail to fetch data', async () => {
    mock.onGet(url).replyOnce(500);

    const data = await unit.getData();
    expect(data).toStrictEqual({});
  });
});
