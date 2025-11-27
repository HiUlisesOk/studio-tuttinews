"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type NewsPerDayPoint = { day: string; noticias: number }
type NewsByCategoryPoint = { categoria: string; cantidad: number }
type StatusPoint = { name: string; value: number; color: string }

interface NewsPerDayChartProps {
  data: NewsPerDayPoint[]
}

interface NewsByCategoryChartProps {
  data: NewsByCategoryPoint[]
}

interface StatusPieChartProps {
  data: StatusPoint[]
}

export function NewsPerDayChart({ data }: NewsPerDayChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorNoticias" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.68 0.19 35)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.68 0.19 35)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.01 270)" />
        <XAxis dataKey="day" stroke="oklch(0.58 0.01 270)" style={{ fontSize: "12px" }} />
        <YAxis stroke="oklch(0.58 0.01 270)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.14 0.01 270)",
            border: "1px solid oklch(0.24 0.01 270)",
            borderRadius: "8px",
            color: "oklch(0.96 0.005 270)",
          }}
        />
        <Area
          type="monotone"
          dataKey="noticias"
          stroke="oklch(0.68 0.19 35)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorNoticias)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function NewsByCategoryChart({ data }: NewsByCategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.01 270)" />
        <XAxis dataKey="categoria" stroke="oklch(0.58 0.01 270)" style={{ fontSize: "12px" }} />
        <YAxis stroke="oklch(0.58 0.01 270)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.14 0.01 270)",
            border: "1px solid oklch(0.24 0.01 270)",
            borderRadius: "8px",
            color: "oklch(0.96 0.005 270)",
          }}
        />
        <Bar dataKey="cantidad" fill="oklch(0.68 0.19 35)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.14 0.01 270)",
              border: "1px solid oklch(0.24 0.01 270)",
              borderRadius: "8px",
              color: "oklch(0.96 0.005 270)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
