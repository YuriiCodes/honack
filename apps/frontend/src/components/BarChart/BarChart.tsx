import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SingleBarValue {
  name: string;
  points: number;
  salary: number;
}

interface BarChartGraphProps {
  data: SingleBarValue[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-content p-3">
        <p className="label font-bold">{`${label}`}</p>
        <p className="points">{`Points: ${payload[0].value}`}</p>
        <p className="salary">{`Expected Salary: ${payload[0].payload.salary}`}</p>
      </div>
    );
  }
  return null;
};

const BarChartGraph = ({ data }: BarChartGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="points" fill="#4506cb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGraph;
