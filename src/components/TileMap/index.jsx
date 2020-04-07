import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as styles from './TileMap.scss';

const TileMap = ({ mapHeight, mapWidth, data }) => {
  const addTileMapContent = tileContent => {
    const svg = d3.select('#mapContent').append('svg');

    svg.attr('width', mapWidth).attr('height', mapHeight);

    const maxColumns = d3.max(tileContent, d => parseInt(d.col, 10));
    const maxRows = d3.max(tileContent, d => parseInt(d.row, 10));

    const tileWidth = mapWidth / (maxColumns + 1);
    const tileHeight = mapHeight / (maxRows + 1);

    svg.append('g').attr('id', 'tileArea');

    const tile = svg
      .select('#tileArea')
      .selectAll('g')
      .data(tileContent)
      .enter()
      .append('g');

    tile
      .append('rect')
      .style('fill', '#8aebf6')
      .attr('width', tileWidth)
      .attr('height', tileHeight)
      .attr('x', d => d.col * tileWidth)
      .attr('y', d => d.row * tileHeight)
      .classed(styles['tile-map__tile'], true);

    tile
      .append('text')
      .attr('x', d => d.col * tileWidth + tileWidth / 5)
      .attr('y', d => d.row * tileHeight + tileHeight / 3)
      .attr('dy', '.35em')
      .text(d => d.region_rus)
      .classed(styles['tile-map__caption'], true);

    return svg;
  };

  useEffect(() => {
    addTileMapContent(data);
  }, []);

  return (
    <div className={styles['tile-map']}>
      <div className={styles['tile-map__content']} id="mapContent" />
    </div>
  );
};

TileMap.propTypes = {
  mapHeight: PropTypes.number.isRequired,
  mapWidth: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
};

export default TileMap;
