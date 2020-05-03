import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import GenericChart from '../GenericChart';
import * as styles from './HorizontalBarChart.scss';


const HorizontalBarChart =
    ({
         data,
         width,
         height,
         id,
         xAxisLabel,
         yAxisLabel
     }) => {

        const buildChart = (data, chartWidth, chartHeight, svg) => {
            const margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },

                width = chartWidth - margin.left - margin.right,
                height = chartHeight - margin.top - margin.bottom;
            data.sort((a,b) => b.value - a.value)

            const y = d3.scaleBand()
                .range([height, 0])
                .padding(0.1);

            const x = d3.scaleLinear()
                .range([0, width]);


            svg.append('g')
                .attr('transform',
                    'translate(' + margin.left + ',' + margin.top + ')');

            x.domain([0, d3.max(data, d => d.value)])
            y.domain(data.map(d => d.name))


            svg.attr('class', styles['chart'])
                .selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', styles['chart__rect'])
                .attr('width', d => x(d.value))
                .attr('y', d => y(d.name))
                .attr('height', y.bandwidth())

            svg.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));


            svg.append('g')
                .call(d3.axisLeft(y));

            const maxLabelWidth = [...data].sort((a,b) => b.name.length - a.name.length)[0].name.length * 5;

            svg.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', -margin.left - maxLabelWidth )
                .attr('x', -(height / 2) )
                .attr('dy', '1em')
                .attr('class', styles['chart__axis-text'])
                .text(yAxisLabel);

            svg.append('text')
                .attr('transform',
                    'translate(' + (width / 2) + ' ,' +
                    (height + margin.top + 20) + ')')
                .attr('class', styles['chart__axis-text'])
                .text(xAxisLabel);

            return svg;
        };

        return <GenericChart
            containerId={id}
            chartWidth={width}
            chartHeight={height}
            data={data}
            buildChart={buildChart.bind(null, data, height, width)}/>
    };

HorizontalBarChart.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    id: PropTypes.string.isRequired,
};

export default HorizontalBarChart;
