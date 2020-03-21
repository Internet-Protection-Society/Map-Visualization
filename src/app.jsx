import React from 'react';
import { hot } from 'react-hot-loader';
import TileMap from 'Components/TileMap';
import Graph from 'Components/Graph';
import style from './app.css';

const dataForGraph = {
  dataset: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
    { x: 6, y: 8 },
    { x: 7, y: 13 },
    { x: 8, y: 21 },
    { x: 9, y: 34 },
    { x: 10, y: 55 },
  ],
  width: 500,
  height: 500,
  margin: 20,
};

const App = () => (
  <div className={style.app}>
    <TileMap />
    <Graph data={dataForGraph} />
  </div>
);

export default hot(module)(App);
