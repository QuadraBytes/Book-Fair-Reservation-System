"use client";

import React, { useMemo, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/card";
import Button from "@/components/adminButton";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
} from "recharts";
import {
    BookOpen,
    Users,
    Store,
    Percent,
    CircleCheckBig,
    Clock,
    TrendingUp,
    TrendingDown,
    CalendarDays,
    FileClock,
    LayoutGrid,
} from "lucide-react";


const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
const formatCurrency = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

const MOCK_TOTAL_STALLS = 180;
const MOCK_BOOKED_STALLS = 136;
const MOCK_PENDING_APPROVALS = 7;
const MOCK_USERS = 942;
const MOCK_ACTIVE_VENDORS = 118;
const MOCK_TODAY_BOOKINGS = 12;
const MOCK_CANCELLATIONS_7D = 3;
const MOCK_REVENUE_30D = 28450;

const bookings7d = [
    { day: "Thu", bookings: 14 },
    { day: "Fri", bookings: 19 },
    { day: "Sat", bookings: 27 },
    { day: "Sun", bookings: 22 },
    { day: "Mon", bookings: 12 },
    { day: "Tue", bookings: 9 },
    { day: "Wed", bookings: 18 },
];

// const revenue30d = Array.from({ length: 12 }).map((_, i) => ({
//   label: `W${i + 1}`,
//   revenue: Math.round(1500 + Math.random() * 1500),
// }));

const occupancyByZone = [
    { zone: "A", occupied: 92, total: 100 },
    { zone: "B", occupied: 34, total: 50 },
    { zone: "C", occupied: 10, total: 30 },
];

// const paymentBreakdown = [
//   { name: "Card", value: 46 },
//   { name: "Cash", value: 22 },
//   { name: "Online", value: 32 },
// ];

const recentBookings = [
    { id: "BK-1043", stall: "A-12", vendor: "Sunrise Books", status: "Paid", amount: 550 },
    { id: "BK-1042", stall: "B-07", vendor: "PageTurner", status: "Pending", amount: 420 },
    { id: "BK-1041", stall: "A-45", vendor: "Lotus Prints", status: "Paid", amount: 610 },
    { id: "BK-1039", stall: "C-03", vendor: "Think & Ink", status: "Refunded", amount: 300 },
];

const pendingApprovals = [
    { id: "AP-208", vendor: "Readers Haven", stallPref: "B-05", submitted: "2h ago" },
    { id: "AP-207", vendor: "BlueMoon Press", stallPref: "C-01", submitted: "5h ago" },
    { id: "AP-206", vendor: "Kandy Kids Books", stallPref: "A-33", submitted: "Yesterday" },
];


const PIE_COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#f87171", "#a78bfa"];

function StatCard({
    title,
    value,
    sublabel,
    icon,
    trend,
}: {
    title: string;
    value: string | number;
    sublabel?: string;
    icon?: React.ReactNode;
    trend?: { direction: "up" | "down"; value: string };
}) {
    return (
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-semibold tracking-tight">{value}</div>
                <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                    {sublabel}
                    {trend ? (
                        <span
                            className={
                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] " +
                                (trend.direction === "up"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-rose-50 text-rose-700")
                            }
                        >
                            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {trend.value}
                        </span>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}


export default function Page() {
    const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");
    const [loading, setLoading] = useState(false);


    const available = useMemo(() => MOCK_TOTAL_STALLS - MOCK_BOOKED_STALLS, []);
    const occupancyPct = useMemo(
        () => Math.round((MOCK_BOOKED_STALLS / MOCK_TOTAL_STALLS) * 100),
        []
    );

    const handleRefresh = () => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(t);
    };

    return (
      <div className="p-6 md:p-8 w-full">
        <h3 className="text-center text-2xl font-serif mb-8">Dashboard</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Stalls"
            value={formatNumber(MOCK_TOTAL_STALLS)}
            sublabel="Configured across all zones"
            icon={<Store className="h-5 w-5" />}
          />
          <StatCard
            title="Available"
            value={formatNumber(available)}
            sublabel="Ready to be booked"
            icon={<CircleCheckBig className="h-5 w-5" />}
            trend={{ direction: "up", value: "+4 today" }}
          />
          <StatCard
            title="Booked"
            value={formatNumber(MOCK_BOOKED_STALLS)}
            sublabel="Across A/B/C zones"
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Occupancy"
            value={`${occupancyPct}%`}
            sublabel="of total capacity"
            icon={<Percent className="h-5 w-5" />}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Users"
            value={formatNumber(MOCK_USERS)}
            sublabel="Total accounts"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Active Vendors"
            value={formatNumber(MOCK_ACTIVE_VENDORS)}
            sublabel="Booked in last 30d"
            icon={<Store className="h-5 w-5" />}
            trend={{ direction: "up", value: "+6%" }}
          />
          <StatCard
            title="Today’s Bookings"
            value={formatNumber(MOCK_TODAY_BOOKINGS)}
            sublabel="Since midnight"
            icon={<Clock className="h-5 w-5" />}
          />
          <StatCard
            title="Cancellations (7d)"
            value={formatNumber(MOCK_CANCELLATIONS_7D)}
            sublabel="All reasons"
            icon={<FileClock className="h-5 w-5" />}
            trend={{ direction: "down", value: "-12%" }}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Bookings — last 7 days</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={bookings7d}
                  margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#60a5fa"
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="#3b82f6"
                    fill="url(#colorBook)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button size="sm" variant="outline">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2 md:mx-0">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="px-2 py-2 font-medium">Booking ID</th>
                      <th className="px-2 py-2 font-medium">Stall</th>
                      <th className="px-2 py-2 font-medium">Vendor</th>
                      <th className="px-2 py-2 font-medium">Status</th>
                      <th className="px-2 py-2 font-medium text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="border-b last:border-none">
                        <td className="px-2 py-3 font-medium">{b.id}</td>
                        <td className="px-2 py-3">{b.stall}</td>
                        <td className="px-2 py-3">{b.vendor}</td>
                        <td className="px-2 py-3">
                          <span
                            className={
                              "px-2 py-1 rounded-full text-xs " +
                              (b.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : b.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700")
                            }
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-right">
                          {formatCurrency(b.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="rounded-2xl lg:col-span-1">
            <CardHeader>
              <CardTitle>Zone Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {occupancyByZone.map((z) => {
                  const pct = Math.round((z.occupied / z.total) * 100);
                  return (
                    <div key={z.zone} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Zone {z.zone}</span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${pct}%` }}
                          aria-hidden
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {z.occupied} / {z.total} stalls occupied
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl lg:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Pending Approvals</CardTitle>
              <div className="text-sm text-muted-foreground">
                {MOCK_PENDING_APPROVALS} requests in queue
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2 md:mx-0">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="px-2 py-2 font-medium">Request ID</th>
                      <th className="px-2 py-2 font-medium">Vendor</th>
                      <th className="px-2 py-2 font-medium">Preferred Stall</th>
                      <th className="px-2 py-2 font-medium">Submitted</th>
                      <th className="px-2 py-2 font-medium text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.map((p) => (
                      <tr key={p.id} className="border-b last:border-none">
                        <td className="px-2 py-3 font-medium">{p.id}</td>
                        <td className="px-2 py-3">{p.vendor}</td>
                        <td className="px-2 py-3">{p.stallPref}</td>
                        <td className="px-2 py-3">{p.submitted}</td>
                        <td className="px-2 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}
