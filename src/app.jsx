import React from 'react';
import TileMap from 'Components/TileMap';

import style from './app.css';
import data from './data/data.js';


const App = () => (
    <div className={style.app}>
        <TileMap
            data={data}
            mapHeight={300}
            mapWidth={600}/>
    </div>
);

export default App;


