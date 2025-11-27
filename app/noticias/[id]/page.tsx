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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Sparkles,
  Save,
  Send,
  Calendar,
  Upload,
  Copy,
  RefreshCw,
} from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"

// ---------- Tipos basados en tu schema ----------
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

interface EditNoticiaPageProps {
  params: Promise<{ id: string }>
}

// ---------- Page ----------
export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {

  // ⬇️ FIX: Next 16 devuelve params como PROMISE
  const { id } = await params

  const supabase = createSupabaseServer()

  // 👉 1) Traemos la nota + 2) todas las categorías, en paralelo
  const [
    { data: articleData, error: articleError },
    { data: categoriesData, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("articles")
      .select(`
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
      `)
      .eq("id", id)                 // ⬅️ FIX REAL
      .maybeSingle(),

    supabase
      .from("categories")
      .select("id, name, slug")
      .order("name", { ascending: true }),
  ])

  if (articleError) {
    console.error("Supabase error (article) en EditNoticiaPage:", articleError)
    return notFound()
  }

  if (!articleData) {
    return notFound()
  }

  if (categoriesError) {
    console.error("Supabase error (categories) en EditNoticiaPage:", categoriesError)
  }

  const article = articleData as ArticleRow
  const categories = (categoriesData as CategoryRow[] | null) ?? []

  const currentCategory =
    categories.find((c) => c.id === article.category_id) ?? null

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/noticias" className="hover:text-foreground transition-colors">
                Noticias
              </Link>
              <span>/</span>
              <span className="text-foreground">Editar noticia</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">

            {/* Meta Information */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Información Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título Interno</Label>
                  <Input
                    id="titulo"
                    defaultValue={article.title}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    defaultValue={article.slug}
                    className="bg-background font-mono text-sm"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select defaultValue={article.status}>
                      <SelectTrigger id="estado" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="review">En revisión</SelectItem>
                        <SelectItem value="scheduled">Programada</SelectItem>
                        <SelectItem value="published">Publicada</SelectItem>
                        <SelectItem value="archived">Archivada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha de Publicación</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fecha"
                        type="datetime-local"
                        defaultValue={
                          article.published_at
                            ? new Date(article.published_at)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        className="bg-background"
                      />
                      <Button variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contenido */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Contenido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titular">Titular Público</Label>
                  <Input
                    id="titular"
                    defaultValue={article.title}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bajada">Bajada / Resumen Editorial</Label>
                  <Textarea
                    id="bajada"
                    rows={3}
                    defaultValue={article.summary ?? ""}
                    className="bg-background resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuerpo">Cuerpo de la Noticia</Label>
                  <div className="rounded-lg border border-border bg-background">
                    <div className="flex items-center gap-2 border-b border-border p-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="font-bold">B</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="italic">I</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="underline">U</span>
                      </Button>
                      <div className="h-4 w-px bg-border" />
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Link
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Quote
                      </Button>
                    </div>
                    <Textarea
                      id="cuerpo"
                      rows={12}
                      placeholder="Escribe el contenido de la noticia..."
                      className="border-0 focus-visible:ring-0 resize-none"
                      defaultValue={article.body ?? ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clasificación */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Clasificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría Principal</Label>
                  <Select defaultValue={currentCategory?.id ?? ""}>
                    <SelectTrigger id="categoria" className="bg-background">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags estáticos por ahora */}
                <div className="space-y-2">
                  <Label>Subcategorías / Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      Economía ×
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      Dólar ×
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      Finanzas ×
                    </Badge>
                    <Button variant="outline" size="sm" className="h-6 bg-transparent">
                      + Agregar tag
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fuente */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Fuente Original</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fuente-url">URL de la nota original</Label>
                  <Input
                    id="fuente-url"
                    type="url"
                    defaultValue={article.source_url ?? ""}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuente-medio">Nombre del medio</Label>
                  <Input
                    id="fuente-medio"
                    defaultValue={article.source_name ?? ""}
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Imagen principal */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Imagen Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 p-12">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Subir imagen
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="imagen-ia"
                    defaultChecked={!!article.ia_raw_summary}
                  />
                  <Label htmlFor="imagen-ia" className="text-sm font-normal">
                    Usar imagen generada por IA
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Acciones */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar a revisión
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Programar publicación
                </Button>
              </CardContent>
            </Card>

            {/* Resumen IA */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Resumen IA
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-chart-4/20 text-chart-4 border-chart-4/30"
                  >
                    {article.ia_raw_summary ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <CardDescription>Generado automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {article.ia_raw_summary ??
                      "Todavía no hay resumen generado por IA para esta noticia."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerar resumen
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar a bajada
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumen-manual" className="text-xs">
                    Editar manualmente
                  </Label>
                  <Textarea
                    id="resumen-manual"
                    rows={4}
                    className="bg-background text-xs resize-none"
                    placeholder="Personaliza el resumen aquí..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats (placeholder) */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vistas</span>
                  <span className="font-semibold">12,458</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Compartidas</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo promedio</span>
                  <span className="font-semibold">3:24 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Última edición</span>
                  <span className="font-semibold">Hace 2h</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
