import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function ChartSection({ currentSalary, currentExp, apiUrl }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/data`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load chart data");
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <p className="text-white/70 mt-4 text-sm">Loading chart...</p>;
  }

  if (error) {
    return <p className="text-red-400 mt-4 text-sm">{error}</p>;
  }

  return (
    <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg">
      <h3 className="text-white text-sm mb-3 opacity-80 flex items-center justify-between">
        <span>Salary Growth 📈</span>
        <span className="text-xs opacity-60">Experience vs Salary</span>
      </h3>

      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="Experience" stroke="#ffffff80" tick={{ fill: "#ffffff80", fontSize: 10 }} />
          <YAxis stroke="#ffffff80" tick={{ fill: "#ffffff80", fontSize: 10 }} />
          <Tooltip
            formatter={(value) => `₹ ${value.toLocaleString()}`}
            labelFormatter={(label) => `Experience: ${label} yrs`}
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontSize: "12px"
            }}
          />
          <Area type="monotone" dataKey="Salary" stroke="#6366f1" fillOpacity={1} fill="url(#colorSalary)" />
        </AreaChart>
      </ResponsiveContainer>

      {currentSalary && (
        <div className="mt-3 text-xs text-white/70 text-center">
          📍 You are here → {currentExp} yrs = ₹ {currentSalary.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default ChartSection;
