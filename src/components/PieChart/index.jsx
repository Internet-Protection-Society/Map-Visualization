import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import GenericChart from '../GenericChart';
import * as styles from './PieChart.scss';

const PieChart = ({data, width, height, id}) => {

    const buildPieChart = (data, chartHeight, chartWidth, svg) => {

        const chartRadius = Math.min(chartWidth, chartHeight) / 2,
            color = d3.interpolateTurbo,
            chart = d3.pie(),
            arc = d3.arc()
                .outerRadius(chartRadius)
                .innerRadius(0)


        const arcs = svg
            .data([data])
            .selectAll('g.arc')
            .data(chart.value(d => d.value))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('transform', `translate(${chartRadius + 30}, ${chartRadius})`)

        arcs.append('path')
            .attr('class', styles['arc__path'])
            .attr('fill', (d, i, arr) => color((i + 1) / arr.length))
            .attr('d', arc);

        arcs.append('text')
            .attr('class', styles['arc__text'])
            .attr('x', d => {
                const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
                d.cx = Math.cos(a) * (chartRadius - 45);
                return d.x = Math.cos(a) * (chartRadius + 30);
            })
            .attr('y', d => {
                const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
                d.cy = Math.sin(a) * (chartRadius - 45);
                return d.y = Math.sin(a) * (chartRadius + 30);
            })
            .text(d =>  d.data.name)
            .each(function (d) {
                const bbox = this.getBBox();
                d.sx = d.x - bbox.width / 2 - 2;
                d.ox = d.x + bbox.width / 2 + 2;
                d.sy = d.oy = d.y + 5;
            });

        // arcs.append('path')
        //     .attr('class', 'pointer')
        //     .style('fill', 'none')
        //     .style('stroke', 'black')
        //     .attr('d', d => d.cx > d.ox
        //         ? `M${d.sx},${d.sy}L${d.ox},${d.oy} ${d.cx},${d.cy}`
        //         : `M${d.ox},${d.oy}L${d.sx},${d.sy} ${d.cx},${d.cy}`
        //     )

        return svg;
    };

    return <GenericChart
        containerId={id}
        chartWidth={width}
        chartHeight={height}
        data={data}
        buildChart={buildPieChart.bind(null, data, height, width)}/>

};

PieChart.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    id: PropTypes.string.isRequired,
};

export default PieChart;
