import React from 'react';
import * as styles from './Tile.scss';

export default () => (
  <div className={styles['tile-map']}>
    <div className={styles['tile-map__content']}>
      <div id="wrapper">
        <div id="menu" className="group" />
        <div id="chart" />
      </div>
    </div>
  </div>
);
