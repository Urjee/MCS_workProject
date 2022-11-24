import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function TopTotal(props) {
  const COLORS = [
    "#ec444e",
    "#be9bd4",
    "#a6be42",
    "#FF8042",
    "#51a4f5",
    "#075eb3",
  ];
  const { data } = props;

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "0px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value} %`}</label>
        </div>
      );
    }
    return null;
  }
  return (
  <PieChart width={800} height={470}>
      <Pie
        data={data}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={160}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={CustomTooltip} />
      <Legend />
    </PieChart>
  );
}
export default TopTotal;
