import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer witdh="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#f8671f" fill="#f1d5c8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
