import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FileText, Edit, Clock, CheckCircle, TrendingUp, AlertCircle } from "lucide-react"

// Dummy data for charts
const newsPerDayData = [
  { day: "Lun", noticias: 12 },
  { day: "Mar", noticias: 19 },
  { day: "Mié", noticias: 15 },
  { day: "Jue", noticias: 22 },
  { day: "Vie", noticias: 18 },
  { day: "Sáb", noticias: 8 },
  { day: "Dom", noticias: 10 },
]

const newsByCategoryData = [
  { categoria: "Mundo", cantidad: 45 },
  { categoria: "Argentina", cantidad: 62 },
  { categoria: "Zárate", cantidad: 38 },
  { categoria: "Opinión", cantidad: 12 },
]

const statusData = [
  { name: "Publicadas", value: 145, color: "oklch(0.68 0.19 35)" },
  { name: "Borradores", value: 23, color: "oklch(0.58 0.18 240)" },
  { name: "Programadas", value: 8, color: "oklch(0.65 0.16 180)" },
  { name: "En Revisión", value: 12, color: "oklch(0.60 0.15 150)" },
]

const recentActivity = [
  {
    action: "Nueva noticia publicada",
    detail: "Crisis económica en Argentina: análisis completo",
    time: "Hace 5 minutos",
    user: "María García",
  },
  {
    action: "Noticia editada",
    detail: "Pronóstico del tiempo para Zárate",
    time: "Hace 12 minutos",
    user: "Juan Pérez",
  },
  {
    action: "Cambio en portada",
    detail: "Actualización del hero principal",
    time: "Hace 25 minutos",
    user: "Ana Martínez",
  },
  {
    action: "Nueva campaña publicitaria",
    detail: "Banner sponsor - Empresa Local XYZ",
    time: "Hace 1 hora",
    user: "Carlos López",
  },
  {
    action: "Noticia programada",
    detail: "Elecciones 2025: Todo lo que necesitas saber",
    time: "Hace 2 horas",
    user: "Laura Sánchez",
  },
]

const topArticles = [
  { title: "Crisis económica: El dólar alcanza nuevo récord histórico", views: "12.5k" },
  { title: "Zárate: Inauguran nuevo centro de salud en el barrio sur", views: "8.2k" },
  { title: "Argentina clasifica al Mundial 2026 tras victoria épica", views: "7.8k" },
  { title: "Clima extremo: Alerta meteorológica para toda la región", views: "6.1k" },
  { title: "Opinión: El futuro de la educación argentina", views: "4.9k" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Resumen general del estado de Tutti News</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicadas Hoy</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground mt-1">+3 desde ayer</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Borrador</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">23</div>
              <p className="text-xs text-muted-foreground mt-1">8 en revisión</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">8</div>
              <p className="text-xs text-muted-foreground mt-1">Próxima en 2h</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">104</div>
              <p className="text-xs text-muted-foreground mt-1">+15% vs anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Left Column - Charts */}
          <div className="space-y-6 lg:col-span-4">
            {/* News Per Day Chart */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Noticias Publicadas por Día</CardTitle>
                <CardDescription>Últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={newsPerDayData}>
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
              </CardContent>
            </Card>

            {/* News By Category Chart */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Noticias por Categoría</CardTitle>
                <CardDescription>Distribución actual</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={newsByCategoryData}>
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="space-y-6 lg:col-span-3">
            {/* Status Donut Chart */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Estados de Noticias</CardTitle>
                <CardDescription>Total: 188 noticias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
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
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Status */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Estado IA / Scrapers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Noticias importadas</p>
                    <p className="text-xs text-muted-foreground">Hace 5 minutos - 12 nuevas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Resúmenes IA generados</p>
                    <p className="text-xs text-muted-foreground">28 de 30 correctamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">2 errores menores</p>
                    <p className="text-xs text-muted-foreground">Fuente "Medio X" no responde</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Articles */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Top 5 Más Leídas</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topArticles.map((article, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.views} vistas</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.user}</span>
                      <span>•</span>
                      <span>{item.time}</span>
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
