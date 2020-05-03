import React from 'react';
import TileMap from 'Components/TileMap';
import PieChart from "./components/PieChart";

import style from './app.css';
import data from './assets/data/data';
import socialMediaData from './assets/data/socialMediaData';
import HorizontalBarChart from "./components/HorizontalBarChart";




const App = () => (
  <div className={style.app}>
    <TileMap data={data} height={500} width={1000} id={'TileChart'}/>
    {/*<PieChart data={socialMediaData} height={500} width={1000} id={'PieChart'}/>*/}
    <HorizontalBarChart
        id={'BarChart'}
        height={500}
        width={500}
        data={socialMediaData}
        xAxisLabel={'Число инцидентов'}
        yAxisLabel={'Соцсеть'}
    />
  </div>
);

export default App;
