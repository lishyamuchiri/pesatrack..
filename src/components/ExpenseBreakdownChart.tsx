
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Food", value: 35, color: "#10B981" },
  { name: "Transport", value: 20, color: "#3B82F6" },
  { name: "Entertainment", value: 15, color: "#8B5CF6" },
  { name: "Utilities", value: 20, color: "#F59E0B" },
  { name: "Others", value: 10, color: "#EF4444" },
];

const ExpenseBreakdownChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Legend
          wrapperStyle={{
            color: "#fff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBreakdownChart;
