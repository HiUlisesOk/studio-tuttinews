import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, Filter, MoreHorizontal, Sparkles } from "lucide-react"
import Link from "next/link"
import { createSupabaseServer } from "@/lib/supabase/server"

// Colores por estado (ajustá keys a tu enum article_status real)
const statusColors: Record<string, string> = {
  published: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  draft: "bg-muted/50 text-muted-foreground border-border",
  scheduled: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  review: "bg-primary/20 text-primary border-primary/30",
  archived: "bg-destructive/20 text-destructive border-destructive/30",

  // por compatibilidad con labels en español si los usás en el futuro
  Publicada: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  Borrador: "bg-muted/50 text-muted-foreground border-border",
  Programada: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "En revisión": "bg-primary/20 text-primary border-primary/30",
  Archivada: "bg-destructive/20 text-destructive border-destructive/30",
}

// 🔹 Tipo según tu schema
type ArticleRow = {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  source_name: string | null
  ia_raw_summary: string | null
  categories?: {
    name: string
    slug: string
  } | null
}

export default async function NoticiasPage() {
  const supabase = createSupabaseServer()

  const { data, error, count } = await supabase
    .from("articles")
    .select(
      `
      id,
      title,
      slug,
      status,
      published_at,
      source_name,
      ia_raw_summary,
      categories:categories (
        name,
        slug
      )
    `,
      { count: "exact" }
    )
    .order("published_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error cargando noticias:", error.message)
  }

  const articles = (data as ArticleRow[] | null) ?? []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              Gestión de Noticias
            </h1>
            <p className="text-muted-foreground mt-1">
              Administra todas las noticias del portal
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/noticias/nueva">
              <Plus className="mr-2 h-4 w-4" />
              Nueva noticia
            </Link>
          </Button>
        </div>

        {/* Filters (UI por ahora, sin lógica de filtro) */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título..."
                  className="pl-9 bg-background"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="todas">
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="mundo">Mundo</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="zarate">Zárate</SelectItem>
                  <SelectItem value="opinion">Opinión</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="todos">
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="published">Publicada</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="review">En revisión</SelectItem>
                  <SelectItem value="scheduled">Programada</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="todos-ia">
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="IA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos-ia">Todos</SelectItem>
                  <SelectItem value="con-ia">Con resumen IA</SelectItem>
                  <SelectItem value="sin-ia">Sin resumen IA</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>IA</TableHead>
                <TableHead>Fuente</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium max-w-md">
                    <Link
                      href={`/noticias/${article.id}`}
                      className="hover:text-primary transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary"
                    >
                      {article.categories?.name ??
                        article.categories?.slug ??
                        "Sin categoría"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        statusColors[article.status] ??
                        "bg-muted/50 text-muted-foreground border-border"
                      }
                    >
                      {article.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleString("es-AR")
                      : "—"}
                  </TableCell>

                  <TableCell>
                    {article.ia_raw_summary ? (
                      <div className="flex items-center gap-1 text-accent">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs">Sí</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {article.source_name ?? "—"}
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {articles.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-sm text-muted-foreground"
                  >
                    No hay noticias cargadas todavía.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">{articles.length}</span> de{" "}
            <span className="font-medium">{count ?? articles.length}</span>{" "}
            noticias
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
