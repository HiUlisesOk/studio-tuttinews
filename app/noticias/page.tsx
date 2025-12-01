// app/noticias/page.tsx
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sparkles } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"
import { NewsFilters } from "./_components/news-filters"
import { RowActionsMenu } from "./_components/row-actions-menu"

const PAGE_SIZE = 10

type ArticleRow = {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  source_name: string | null
  ia_raw_summary: string | null
  // Supabase devuelve esto como array
  categories: { name: string | null; slug: string | null }[] | null
}

// 👇 En tu versión de Next, searchParams viene como Promise
type NoticiasPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  draft: "bg-muted/50 text-muted-foreground border-border",
  scheduled: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  review: "bg-primary/15 text-primary border-primary/30",
  archived: "bg-destructive/15 text-destructive border-destructive/30",
}

export default async function NoticiasPage(props: NoticiasPageProps) {
  const supabase = await createSupabaseServer()

  // 👇 Acá resolvemos la Promise de searchParams
  const searchParams = await props.searchParams

  // ---------- normalizar search params ----------
  const rawPage = searchParams.page
  const rawQ = searchParams.q
  const rawCategory = searchParams.category
  const rawStatus = searchParams.status
  const rawIa = searchParams.ia

  const pageParam =
    typeof rawPage === "string"
      ? rawPage
      : Array.isArray(rawPage)
      ? rawPage[0]
      : undefined

  const q =
    typeof rawQ === "string"
      ? rawQ
      : Array.isArray(rawQ)
      ? rawQ[0]
      : ""

  const category =
    typeof rawCategory === "string"
      ? rawCategory
      : Array.isArray(rawCategory)
      ? rawCategory[0]
      : "todas"

  const status =
    typeof rawStatus === "string"
      ? rawStatus
      : Array.isArray(rawStatus)
      ? rawStatus[0]
      : "todos"

  const ia =
    typeof rawIa === "string"
      ? rawIa
      : Array.isArray(rawIa)
      ? rawIa[0]
      : "todos"

  const page = Number(pageParam ?? "1") || 1

  // ---------- base query ----------
  let query = supabase
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

  // ---------- filtros ----------
  if (q) query = query.ilike("title", `%${q}%`)

  if (status !== "todos") {
    query = query.eq("status", status)
  }

  if (ia === "con-ia") {
    query = query.not("ia_raw_summary", "is", null)
  } else if (ia === "sin-ia") {
    query = query.is("ia_raw_summary", null)
  }

  if (category !== "todas") {
    // si en algún momento mapeás slug de categoría, podés usar esto
    query = query.eq("categories.slug", category)
  }

  // ---------- paginado ----------
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await query
    .order("published_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error cargando noticias:", error.message)
    return (
      <DashboardLayout>
        <div className="p-6 text-sm text-destructive">
          Ocurrió un error al cargar las noticias.
        </div>
      </DashboardLayout>
    )
  }

  const articles = (data as ArticleRow[] | null) ?? []
  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // ---------- base query string para los links de paginado ----------
  const baseParams = new URLSearchParams()
  if (q) baseParams.set("q", q)
  if (category !== "todas") baseParams.set("category", category)
  if (status !== "todos") baseParams.set("status", status)
  if (ia !== "todos") baseParams.set("ia", ia)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión de Noticias
            </h1>
            <p className="text-muted-foreground mt-1">
              Administra todas las noticias del portal
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/noticias/nueva">Nueva noticia</Link>
          </Button>
        </div>

        {/* Filtros */}
        <NewsFilters />

        {/* Tabla */}
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
              {articles.map((article) => {
                const cat = article.categories?.[0]
                const catLabel = cat?.name ?? cat?.slug ?? "Sin categoría"

                return (
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
                        {catLabel}
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
                        <span className="text-xs text-muted-foreground">
                          No
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {article.source_name ?? "—"}
                    </TableCell>

                    <TableCell className="text-right">
                      <RowActionsMenu articleId={article.id} />
                    </TableCell>
                  </TableRow>
                )
              })}

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

        {/* Paginado */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">{articles.length}</span> de{" "}
            <span className="font-medium">{total}</span> noticias
          </p>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1
              const active = pageNum === page
              const params = new URLSearchParams(baseParams)
              params.set("page", String(pageNum))
              const href = `/noticias?${params.toString()}`

              return (
                <Link key={pageNum} href={href}>
                  <Button
                    variant={active ? "default" : "outline"}
                    size="sm"
                    className={
                      active
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : ""
                    }
                  >
                    {pageNum}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
