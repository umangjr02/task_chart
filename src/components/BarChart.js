import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data }) => {
  const chartData = [{
    type: 'bar',
    x: data.map(row => row.name),
    y: data.map(row => row.salary),
  }];

  return (
    <Plot
      data={chartData}
      layout={{ width: 600, height: 400, title: 'Bar Chart' }}
    />
  );
};

export default BarChart;
