import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import GenericChart from "../GenericChart";

import * as styles from './TileMap.scss';

const TileMap = ({data, width, height, id}) => {

    const buildTileMap = (data, mapHeight, mapWidth, svg) => {

        const maxColumns = d3.max(data, d => parseInt(d.col, 10));
        const maxRows = d3.max(data, d => parseInt(d.row, 10));

        const tileWidth = mapWidth / (maxColumns + 1);
        const tileHeight = mapHeight / (maxRows + 1);

        svg.append('g').attr('id', 'tileArea');

        const tile = svg
            .select('#tileArea')
            .selectAll('g')
            .data(data)
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

    return <GenericChart
        containerId={id}
        chartWidth={width}
        chartHeight={height}
        data={data}
        buildChart={buildTileMap.bind(null, data, height, width)}/>

};

TileMap.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    id: PropTypes.string.isRequired,
};

export default TileMap;
