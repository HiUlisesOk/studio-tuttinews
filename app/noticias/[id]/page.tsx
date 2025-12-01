// app/noticias/[id]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"

type ArticleRow = {
  id: string
  title: string
  slug: string
  summary: string | null
  body: string | null
  status: string
  category_id: string
  source_name: string | null
  source_url: string | null
  hero_image_url: string | null
  ia_raw_summary: string | null
  published_at: string | null
}

type CategoryRow = {
  id: string
  name: string
  slug: string
}

interface ShowNoticiaPageProps {
  params: Promise<{ id: string }>
}

export default async function ShowNoticiaPage(props: ShowNoticiaPageProps) {
  const { id } = await props.params
  const supabase = await createSupabaseServer()

  const [
    { data: articleData, error: articleError },
    { data: categoriesData, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("articles")
      .select(
        `
        id,
        title,
        slug,
        summary,
        body,
        status,
        category_id,
        source_name,
        source_url,
        hero_image_url,
        ia_raw_summary,
        published_at
      `
      )
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("categories")
      .select("id, name, slug")
      .order("name", { ascending: true }),
  ])

  if (articleError) {
    console.error("Supabase error (article) en ShowNoticiaPage:", articleError)
    return notFound()
  }
  if (!articleData) return notFound()
  if (categoriesError) {
    console.error("Supabase error (categories) en ShowNoticiaPage:", categoriesError)
  }

  const article = articleData as ArticleRow
  const categories = (categoriesData as CategoryRow[] | null) ?? []
  const currentCategory =
    categories.find((c) => c.id === article.category_id) ?? null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb + header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link
                href="/noticias"
                className="hover:text-foreground transition-colors"
              >
                Noticias
              </Link>
              <span>/</span>
              <span className="text-foreground">Detalle</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {article.title}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              {article.published_at && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.published_at).toLocaleString("es-AR")}
                </span>
              )}
              {currentCategory && (
                <Badge variant="outline">{currentCategory.name}</Badge>
              )}
              <Badge variant="outline" className="uppercase">
                {article.status}
              </Badge>
            </div>
          </div>

          <Button asChild>
            <Link href={`/noticias/${article.id}/editar`}>Editar</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Columna principal */}
{/* Columna principal */}
<div className="space-y-6 lg:col-span-2">
  {/* 🔥 Imagen Principal */}
  {article.hero_image_url && (
    <div className="relative w-full overflow-hidden rounded-xl border border-border/40 bg-black/30">
      <div className="aspect-[16/9] relative">
        <img
          src={article.hero_image_url}
          alt={`Imagen de la noticia ${article.title}`}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )}

  {/* Resumen */}
  <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
    <CardHeader>
      <CardTitle>Resumen</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {article.summary ? (
        <p className="text-lg leading-relaxed">{article.summary}</p>
      ) : (
        <p className="text-muted-foreground">
          Esta noticia todavía no tiene resumen editorial.
        </p>
      )}
    </CardContent>
  </Card>

  {/* Cuerpo */}
  <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
    <CardHeader>
      <CardTitle>Cuerpo</CardTitle>
    </CardHeader>
    <CardContent>
      {article.body ? (
        <p className="whitespace-pre-line leading-relaxed text-sm">
          {article.body}
        </p>
      ) : (
        <p className="text-muted-foreground">
          Esta noticia todavía no tiene cuerpo cargado.
        </p>
      )}
    </CardContent>
  </Card>

  {/* Fuente Original */}
  <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
    <CardHeader>
      <CardTitle>Fuente Original</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-sm">
      <div>
        <span className="text-muted-foreground">Medio: </span>
        <span>{article.source_name ?? "—"}</span>
      </div>
      <div>
        <span className="text-muted-foreground">URL: </span>
        {article.source_url ? (
          <a
            href={article.source_url}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline break-all"
          >
            {article.source_url}
          </a>
        ) : (
          <span>—</span>
        )}
      </div>
    </CardContent>
  </Card>
</div>


          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Resumen IA
                  </CardTitle>
                </div>
                <CardDescription>Generado automáticamente</CardDescription>
              </CardHeader>
              <CardContent>
                {article.ia_raw_summary ? (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.ia_raw_summary}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Todavía no hay resumen generado por IA para esta noticia.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
