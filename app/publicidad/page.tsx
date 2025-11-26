"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, MousePointerClick, Eye, Plus, ExternalLink } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const campaigns = [
  {
    id: 1,
    name: "Banner Superior - Sponsor A",
    status: "active",
    clicks: 1234,
    impressions: 45678,
    budget: 5000,
    spent: 3200,
  },
  {
    id: 2,
    name: "Lateral Derecho - Sponsor B",
    status: "active",
    clicks: 987,
    impressions: 32156,
    budget: 3000,
    spent: 2100,
  },
  {
    id: 3,
    name: "Footer Premium - Sponsor C",
    status: "paused",
    clicks: 543,
    impressions: 18234,
    budget: 2000,
    spent: 890,
  },
]

const performanceData = [
  { date: "Lun", clicks: 245, impressions: 4200 },
  { date: "Mar", clicks: 312, impressions: 5100 },
  { date: "Mié", clicks: 289, impressions: 4800 },
  { date: "Jue", clicks: 421, impressions: 6300 },
  { date: "Vie", clicks: 378, impressions: 5900 },
  { date: "Sáb", clicks: 198, impressions: 3400 },
  { date: "Dom", clicks: 167, impressions: 2800 },
]

const revenueData = [
  { month: "Ene", revenue: 12400 },
  { month: "Feb", revenue: 15200 },
  { month: "Mar", revenue: 18900 },
  { month: "Abr", revenue: 17600 },
  { month: "May", revenue: 21300 },
  { month: "Jun", revenue: 24800 },
]

export default function PublicidadPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Publicidad & Afiliados</h1>
            <p className="text-muted-foreground text-pretty">
              Gestiona campañas publicitarias y programas de afiliados
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva campaña
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,800</div>
              <p className="text-xs text-muted-foreground">+16.4% vs. mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campañas activas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">3 campañas totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks totales</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,764</div>
              <p className="text-xs text-muted-foreground">CTR promedio: 2.8%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impresiones</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96k</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento semanal</CardTitle>
              <CardDescription>Clicks e impresiones de los últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="impressions" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos mensuales</CardTitle>
              <CardDescription>Evolución de ingresos por publicidad</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campañas activas</CardTitle>
            <CardDescription>Gestiona las campañas publicitarias en el portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-lg border border-border bg-card/50 p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status === "active" ? "Activa" : "Pausada"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()} gastados
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver detalles
                    </Button>
                  </div>

                  <Progress value={(campaign.spent / campaign.budget) * 100} className="mb-4" />

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Impresiones</div>
                      <div className="text-lg font-semibold">{campaign.impressions.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Clicks</div>
                      <div className="text-lg font-semibold">{campaign.clicks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CTR</div>
                      <div className="text-lg font-semibold">
                        {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
