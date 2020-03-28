import React, { useEffect, useState } from 'react';
import * as styles from './TileMap.scss';
import * as d3 from 'd3';


export default ({ mapHeight, mapWidth, data }) => {


    useEffect(() => {
        addTileMapContent(data)
    }, []);

    const addTileMapContent = data => {

        const svg = d3.select('#mapContent').append('svg');

        svg.attr('width', mapWidth)
            .attr('height', mapHeight);

        const maxColumns = d3.max(data, d => parseInt(d.col));
        const maxRows = d3.max(data, d => parseInt(d.row));

        const tileWidth = mapWidth / (maxColumns + 1);
        const tileHeight = mapHeight / (maxRows + 1);

        svg.append('g').attr('id', 'tileArea');

        const tile = svg
            .select('#tileArea')
            .selectAll('g')
            .data(data)
            .enter()
            .append('g');

        tile.append('rect')
            .attr('width', tileWidth)
            .attr('height', tileHeight)
            .attr('x', d => d.col * tileWidth)
            .attr('y', d => d.row * tileHeight);

        return svg;
    };

    return (
        <div className={styles['tile-map']}>
            <div className={styles['tile-map__content']} id={'mapContent'}>
            </div>
        </div>
    )
}



