import { useEffect, useState } from "react";
import { getStats } from "../services/adminApi";
import AdminLayout from "../components/AdminLayout";
import "../../styles/admin/AdminDashboard.css";

import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line, Area, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#4f46e5", "#0ea5e9", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        {label && <p className="tooltip-label">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} className="tooltip-value" style={{ color: p.color || p.fill }}>
            {p.name}: <strong>{p.value?.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ label, value, accentColor }) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: accentColor }} />
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value ?? "—"}</div>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="chart-box">
      <h3 className="chart-box-title">{title}</h3>
      {children}
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(res => setStats(res.data));
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">
            Sleep disorder analytics · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <span className="live-badge">LIVE</span>
      </div>

      {!stats ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading analytics…</p>
        </div>
      ) : (
        <div className="dashboard-body">

          {/* ── STAT CARDS ── */}
          <div className="stat-cards-grid">
            <StatCard
              label="Total Users"
              value={stats.total_users?.toLocaleString()}
              accentColor="#4f46e5"
            />
            <StatCard
              label="Total Predictions"
              value={stats.total_predictions?.toLocaleString()}
              accentColor="#0ea5e9"
            />
          </div>

          {/* ── PIE + BAR ── */}
          <div className="charts-row">
            <ChartBox title="Sleep Disorder Distribution">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats.prediction_stats}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {stats.prediction_stats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", color: "#64748b" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Risk Level Analysis">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stats.risk_stats} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4fa" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(79,70,229,0.04)" }} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </div>

          {/* ── AREA LINE CHART ── */}
          <ChartBox title="Predictions Over Time">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats.predictions_over_time}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4fa" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fill="url(#areaGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>

        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;