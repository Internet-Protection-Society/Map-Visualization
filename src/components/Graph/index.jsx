import React from 'react';
import * as d3 from 'd3';

IxClickOut.dataTypes = {
    children: dataTypes.any,
    onClickOut: dataTypes.func,
};

export default ({ data }) => {
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.dataset, d => d.x))
    .range([data.margin, data.width]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.dataset, d => d.y)])
    .range([data.height, data.margin]);
  const line = d3
    .line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.7));
  return (
    <div>
      <svg height={data.height} width={data.width}>
        <line
          className="axis"
          x1={data.margin}
          x2={data.width}
          y1={data.height}
          y2={data.height}
        />
        <line
          className="axis"
          x1={data.margin}
          x2={data.margin}
          y1={data.margin}
          y2={data.height}
        />
        <path d={line(data.dataset)} />
      </svg>
    </div>
  );
};
