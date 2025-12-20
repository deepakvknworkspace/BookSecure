import { useEffect, useState } from "react"
import {
  BookOpen,
  UserCheck,
  UserX,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "../src/Slice/adminAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null)
  const [errorStats, setErrorStats] = useState([])
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(null);

const token = useSelector((state) => state.adminAuth.token);
const dispatch = useDispatch();
const navigate = useNavigate();

  /* ---------------- FETCH APIS ---------------- */
useEffect(() => {
  if (!token) return; // safety check

  const fetchDashboardData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [statsRes, errorRes] = await Promise.all([
        fetch("https://api.securemybook.com/admin/stats", { headers }),
        fetch("https://api.securemybook.com/admin/errorbooks", { headers }),
      ]);

      if (!statsRes.ok || !errorRes.ok) {
        throw new Error("Unauthorized or failed to fetch data");
      }

      const statsJson = await statsRes.json();
      const errorJson = await errorRes.json();

      setStatsData(statsJson.data);

      setErrorStats(
        errorJson.data.map((item) => ({
          ...item,
          errorReportedBy: item.errorReportedBy.map((e) => ({
            name: e.name || "Unknown",
            phone: e.phone,
          })),
        }))
      );
    } catch (err) {
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, [token]);


const handleLogout = () => {
  dispatch(logout());          // 🔹 clears redux + sessionStorage
  navigate("/admin/login");    // 🔹 redirect
};

  const toggleExpanded = (index) => {
    setExpandedRows((prev) => {
      const set = new Set(prev)
      set.has(index) ? set.delete(index) : set.add(index)
      return set
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    )
  }

  /* ---------------- DATA MAPPING ---------------- */
  const stats = [
    {
      title: "Total Books",
      value: statsData.totalBooks.toLocaleString(),
      icon: BookOpen,
      bg: "bg-blue-500",
      trend: "Total Books Generated",
      up: true,
    },
    {
      title: "Verified Books",
      value: statsData.verifiedBooks.toLocaleString(),
      icon: UserCheck,
      bg: "bg-green-500",
      trend: "Total Books Verified",
      up: true,
    },
    {
      title: "Unverified Books",
      value: statsData.unverifiedBooks.toLocaleString(),
      icon: UserX,
      bg: "bg-orange-500",
      trend: " Verification Pending Books ",
      up: false,
    },
    {
      title: "Flagged Books",
      value: errorStats.length,
      icon: AlertTriangle,
      bg: "bg-red-500",
      trend: ` +${errorStats.length} Suspected Books`,
      up: false,
    },
  ]

  const availableYears = [
  ...new Set(statsData.monthlyVerified.map((m) => m._id.year)),
];


  const pieData = [
    { name: "Verified", value: statsData.verifiedBooks },
    { name: "Unverified", value: statsData.unverifiedBooks },
  ]

const filteredMonthly = statsData.monthlyVerified.filter(
  (m) => !selectedYear || m._id.year === selectedYear
);

const monthlyData = filteredMonthly.map((m) => ({
  month: new Date(m._id.year, m._id.month - 1).toLocaleString("default", {
    month: "short",
  }),
  count: m.count,
}));


  const COLORS = ["#22c55e", "#f97316"]

  /* ---------------- UI ---------------- */
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="flex justify-between items-center mb-10">
  <h1 className="text-4xl font-bold">Admin Dashboard</h1>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow transition"
  >
    <LogOut className="w-4 h-4" />
    Logout
  </button>
</div>


      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{s.title}</p>
                  <h3 className="text-3xl font-bold">{s.value}</h3>
                </div>
                <div className={`${s.bg} p-3 rounded-xl`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center text-xs">
                <TrendingUp
                  className={`w-4 h-4 ${
                    s.up ? "text-green-600" : "text-red-600 rotate-180"
                  }`}
                />
                <span
                  className={`ml-1 font-semibold ${
                    s.up ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {s.trend}
                </span>
             {/* <span className="ml-2 text-gray-400">Total Books Generated</span> */}
              </div>
            </div>
          )
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Book Verification Status
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      <div className="bg-white rounded-2xl shadow p-6">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">
      Monthly Verification Trend
    </h3>

    <select
      value={selectedYear || ""}
      onChange={(e) =>
        setSelectedYear(
          e.target.value ? Number(e.target.value) : null
        )
      }
      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Years</option>
      {availableYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

  {/* CHART */}
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={monthlyData} barCategoryGap="40%">
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="count"
        fill="#3b82f6"
        barSize={18}
        radius={[6, 6, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>

</div>



      </div>

      {/* ERROR BOOKS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <AlertTriangle className="text-red-500" /> Error Reported Books
        </h3>
        <span className="ml-2 text-gray-400">A book with more than 30 error cases will be displayed in this session</span>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Serial Number</th>
              <th className="text-left">Book Name</th>
              <th className="text-center">Errors</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {errorStats.map((b, i) => {
              const expanded = expandedRows.has(i)
              const shown = expanded
                ? b.errorReportedBy
                : b.errorReportedBy.slice(0, 5)

              return (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs">{b.serialNumber}</td>
                  <td>{b.bookName || "Unknown"}</td>
                  <td className="text-center font-semibold text-red-600">
                    {b.totalErrorEntries}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {shown.map((e, idx) => (
                        <span
                          key={idx}
                          className="bg-red-50 border border-red-200 px-2 py-1 rounded text-xs"
                        >
                          {e.name} – {e.phone}
                        </span>
                      ))}
                      {b.errorReportedBy.length > 5 && (
                        <button
                          onClick={() => toggleExpanded(i)}
                          className="text-blue-600 text-xs"
                        >
                          {expanded ? "Show less" : "More"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
