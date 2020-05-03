import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const GenericChart =
    ({
         containerId,
         chartHeight,
         chartWidth,
         data,
         buildChart,
     }) => {

        const addContent = (
            containerId,
            chartHeight,
            chartWidth,
            data,
            buildChart,
        ) => {
            const svg = d3.select(`#${containerId}`).append('svg')

            svg.attr('width', chartWidth).attr('height', chartHeight)

            return buildChart(svg)
        };

        useEffect(() => {
            addContent(
                containerId,
                chartHeight,
                chartWidth,
                data,
                buildChart,
            );
        }, []);

        return <div id={containerId}/>
    };

GenericChart.propTypes = {
    containerId: PropTypes.string.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    buildChart: PropTypes.instanceOf(Function).isRequired,
};

export default GenericChart;
