import React from 'react';
import TileMap from 'Components/TileMap';

import style from './app.css';
import data from './data/data.js';

const App = () => (
  <div className={style.app}>
    <TileMap data={data} mapHeight={500} mapWidth={1000} />
  </div>
);

export default App;
