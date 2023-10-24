import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceLine
} from 'recharts';

const Graphic = ({ data, chiusura }) => {
  return (
    <div>
      <LineChart width={600} height={400} data={data} margin={{ top: 45, left: 20, right: 30, bottom: 5 }}>
        <XAxis style={{ fontSize: '14px', color: 'green' }} dataKey="datetime" />
        <YAxis
          style={{ fontSize: '14px' }}
          domain={[
            dataMin => ((dataMin - dataMin * 10 / 100).toFixed(2)),
            dataMax => ((dataMax + dataMax * 10 / 100).toFixed(2))
          ]}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <ReferenceLine y={chiusura} label='' stroke='red' />
        <Line type="monotone" dataKey="price" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Graphic;
