import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SleepChart({ userInput }) {
  const data = [
    { name: "Sleep Duration", value: userInput.Sleep_Duration },
    { name: "Stress Level", value: userInput.Stress_Level },
    { name: "Physical Activity Level", value: userInput.Physical_Activity_Level },
    { name: "Quality of Sleep", value: userInput.Quality_of_Sleep },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SleepChart;