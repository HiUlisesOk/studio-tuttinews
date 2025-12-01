import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FileText,
  Edit,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import {
  NewsPerDayChart,
  NewsByCategoryChart,
  StatusPieChart,
} from "@/components/dashboard-charts"
import { createSupabaseServer } from "@/lib/supabase/server"

// Opcional: revalidar cada 60 segundos
export const revalidate = 60

// ---- Tipos básicos ----
type ArticleRow = {
  id: string
  title: string
  status: string
  category_id: string
  published_at: string | null
  created_at: string
  updated_at: string
}

type CategoryRow = {
  id: string
  name: string
}

type NewsPerDayDatum = { day: string; noticias: number }
type NewsByCategoryDatum = { categoria: string; cantidad: number }
type StatusDatum = { name: string; value: number; color: string }

type RecentActivityItem = {
  action: string
  detail: string
  time: string
  user: string
}

// ---- Helpers de fechas ----
function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isWithinLastNDays(date: Date, days: number) {
  const now = new Date()
  const min = new Date()
  min.setDate(now.getDate() - (days - 1)) // incluye hoy
  min.setHours(0, 0, 0, 0)
  return date >= min && date <= now
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 1000 / 60)

  if (diffMinutes < 1) return "Hace segundos"
  if (diffMinutes < 60) return `Hace ${diffMinutes} min`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `Hace ${diffHours} h`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString("es-AR")
}

// ---- Config de status -> label/color ----
// 👉 Ajustá estos keys si tu enum de status usa otros nombres
const STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  published: {
    label: "Publicadas",
    color: "oklch(0.68 0.19 35)",
  },
  draft: {
    label: "Borradores",
    color: "oklch(0.58 0.18 240)",
  },
  scheduled: {
    label: "Programadas",
    color: "oklch(0.65 0.16 180)",
  },
  review: {
    label: "En Revisión",
    color: "oklch(0.60 0.15 150)",
  },
}

// ---- Carga de datos desde Supabase ----
async function getDashboardData() {
  const supabase = await createSupabaseServer()

  // Traemos todos los artículos con info básica
  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select("id, title, status, category_id, published_at, created_at, updated_at")
    .order("created_at", { ascending: false })

  if (articlesError) {
    console.error("Error fetching articles:", articlesError)
    return {
      articles: [] as ArticleRow[],
      categories: [] as CategoryRow[],
    }
  }

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true })

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError)
    return {
      articles: articles as ArticleRow[],
      categories: [] as CategoryRow[],
    }
  }

  return {
    articles: articles as ArticleRow[],
    categories: categories as CategoryRow[],
  }
}

// ---- Transformaciones para las cards y gráficos ----
function buildNewsPerDayData(articles: ArticleRow[]): NewsPerDayDatum[] {
  const today = startOfToday()

  // Últimos 7 días (incluyendo hoy)
  const days: { date: Date; label: string }[] = Array.from(
    { length: 7 },
    (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (6 - i)) // hace 6 días ... hoy
      const label = d.toLocaleDateString("es-AR", {
        weekday: "short",
      })
      return { date: d, label }
    }
  )

  const counts: NewsPerDayDatum[] = days.map((d) => ({
    day: d.label.charAt(0).toUpperCase() + d.label.slice(1), // "lun." -> "Lun."
    noticias: 0,
  }))

  for (const article of articles) {
    if (article.status !== "published" || !article.published_at) continue
    const pubDate = new Date(article.published_at)

    days.forEach((d, idx) => {
      if (isSameDay(pubDate, d.date)) {
        counts[idx].noticias += 1
      }
    })
  }

  return counts
}

function buildNewsByCategoryData(
  articles: ArticleRow[],
  categories: CategoryRow[]
): NewsByCategoryDatum[] {
  const categoryMap = new Map<string, string>()
  categories.forEach((c) => categoryMap.set(c.id, c.name))

  const counts = new Map<string, number>()

  for (const article of articles) {
    if (article.status !== "published") continue
    const name =
      categoryMap.get(article.category_id) ?? "Sin categoría"
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  return Array.from(counts.entries()).map(([categoria, cantidad]) => ({
    categoria,
    cantidad,
  }))
}

function buildStatusData(articles: ArticleRow[]): StatusDatum[] {
  const statusCounts = new Map<string, number>()

  for (const article of articles) {
    const current = statusCounts.get(article.status) ?? 0
    statusCounts.set(article.status, current + 1)
  }

  const result: StatusDatum[] = []

  for (const [status, value] of statusCounts.entries()) {
    const config = STATUS_CONFIG[status]
    if (!config) continue // ignoramos estados no mapeados
    result.push({
      name: config.label,
      value,
      color: config.color,
    })
  }

  return result
}

function buildTopArticles(articles: ArticleRow[]) {
  const published = articles.filter(
    (a) => a.status === "published" && a.published_at
  )

  const sorted = [...published].sort(
    (a, b) =>
      new Date(b.published_at!).getTime() -
      new Date(a.published_at!).getTime()
  )

  return sorted.slice(0, 5).map((a) => ({
    title: a.title,
    publishedAt: a.published_at!,
  }))
}

function buildRecentActivity(articles: ArticleRow[]): RecentActivityItem[] {
  // Tomamos los últimos 10 artículos por updated_at
  const sorted = [...articles].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() -
      new Date(a.updated_at).getTime()
  )

  return sorted.slice(0, 10).map((a) => {
    const createdAt = new Date(a.created_at)
    const updatedAt = new Date(a.updated_at)
    const isEdit = updatedAt.getTime() - createdAt.getTime() > 1000 // 1s de diferencia

    return {
      action: isEdit ? "Noticia actualizada" : "Noticia creada",
      detail: a.title,
      time: formatRelativeTime(isEdit ? updatedAt : createdAt),
      // No tenemos user en este schema -> usamos "Sistema"
      user: "Sistema",
    }
  })
}

// ---- Página ----
export default async function DashboardPage() {
  const { articles, categories } = await getDashboardData()

  const newsPerDayData = buildNewsPerDayData(articles)
  const newsByCategoryData = buildNewsByCategoryData(
    articles,
    categories
  )
  const statusData = buildStatusData(articles)
  const topArticles = buildTopArticles(articles)
  const recentActivity = buildRecentActivity(articles)

  // Stats principales
  const today = startOfToday()
  const publishedToday = articles.filter((a) => {
    if (a.status !== "published" || !a.published_at) return false
    return isSameDay(new Date(a.published_at), today)
  }).length

  const draftCount = articles.filter((a) => a.status === "draft").length
  const scheduledCount = articles.filter(
    (a) => a.status === "scheduled"
  ).length

  // Semana actual (últimos 7 días) vs semana anterior
  const now = new Date()
  const thisWeekPublished = articles.filter((a) => {
    if (a.status !== "published" || !a.published_at) return false
    return isWithinLastNDays(new Date(a.published_at), 7)
  }).length

  const prevWeekPublished = articles.filter((a) => {
    if (a.status !== "published" || !a.published_at) return false
    const d = new Date(a.published_at)
    // Entre 8 y 14 días atrás
    const max = new Date()
    max.setDate(now.getDate() - 7)
    max.setHours(23, 59, 59, 999)
    const min = new Date()
    min.setDate(now.getDate() - 14)
    min.setHours(0, 0, 0, 0)
    return d >= min && d <= max
  }).length

  let weekDeltaLabel = "Sin datos previos"
  if (prevWeekPublished > 0) {
    const diff = thisWeekPublished - prevWeekPublished
    const pct = Math.round((diff / prevWeekPublished) * 100)
    const sign = pct > 0 ? "+" : ""
    weekDeltaLabel = `${sign}${pct}% vs anterior`
  }

  const totalArticles = articles.length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Resumen general del estado de Tutti News (datos en vivo desde
            Supabase)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Publicadas Hoy
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {publishedToday}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Basado en <code>published_at</code>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En Borrador
              </CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {draftCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de artículos con status <code>draft</code>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Programadas
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">
                {scheduledCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Status <code>scheduled</code>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Esta Semana
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {thisWeekPublished}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {weekDeltaLabel}
              </p>
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
                <NewsPerDayChart data={newsPerDayData} />
              </CardContent>
            </Card>

            {/* News By Category Chart */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Noticias por Categoría</CardTitle>
                <CardDescription>
                  Distribución de noticias publicadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsByCategoryChart data={newsByCategoryData} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="space-y-6 lg:col-span-3">
            {/* Status Donut Chart */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Estados de Noticias</CardTitle>
                <CardDescription>
                  Total: {totalArticles} noticias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StatusPieChart data={statusData} />
              </CardContent>
            </Card>

            {/* AI Status (por ahora sigue “fake”, hasta que tengamos tabla) */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Estado IA / Scrapers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Noticias importadas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Placeholder hasta que tengamos métricas reales
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Resúmenes IA generados
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Se puede conectar luego a una tabla de jobs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Errores recientes
                    </p>
                    <p className="text-xs text-muted-foreground">
                      También migrable a tabla de logs en Supabase
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Articles */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Últimas 5 Publicadas</CardTitle>
                <CardDescription>
                  Ordenadas por <code>published_at</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topArticles.map((article, index) => (
                    <div
                      key={article.title + index}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Publicada el{" "}
                          {new Date(
                            article.publishedAt
                          ).toLocaleString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {topArticles.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Todavía no hay noticias publicadas.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimos cambios sobre artículos (basado en created_at /
              updated_at)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.user}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Todavía no hay actividad registrada.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
