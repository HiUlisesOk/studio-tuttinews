// app/noticias/nueva/page.tsx
import Link from "next/link"
import { redirect } from "next/navigation"
import { randomUUID } from "crypto"
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
import { Calendar, Save } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"
import { ImageUploader } from "@/app/noticias/_components/image-uploader"
import { PublishDatetimeField } from "@/app/noticias/_components/publish-datetime-field"


type CategoryRow = {
  id: string
  name: string
  slug: string
}

// ---------- Server Action: crear artículo + subir imagen ----------
async function createArticle(formData: FormData) {
  "use server"

  const supabase = await createSupabaseServer()

  const title = (formData.get("titulo") as string | null) ?? ""
  const slug = (formData.get("slug") as string | null) ?? ""
  const summary = (formData.get("bajada") as string | null) ?? ""
  const body = (formData.get("cuerpo") as string | null) ?? ""
  const status = (formData.get("estado") as string | null) ?? "draft"
  const categoryId = (formData.get("categoria") as string | null) ?? null
  const sourceUrl = (formData.get("fuente-url") as string | null) ?? null
  const sourceName = (formData.get("fuente-medio") as string | null) ?? null
  const publishedAtStr = formData.get("fecha") as string | null

  const file = formData.get("hero_image") as File | null

  let heroImageUrl: string | null = null

  // Subimos la imagen solo si se eligió archivo
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "jpg"
    const filePath = `articles/${randomUUID()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("news-images") // bucket de Supabase
      .upload(filePath, file)

    if (uploadError) {
      console.error("Error subiendo imagen:", uploadError.message)
    } else {
      const { data: publicData } = supabase.storage
        .from("news-images")
        .getPublicUrl(filePath)

      heroImageUrl = publicData.publicUrl
    }
  }

  const published_at =
    publishedAtStr && publishedAtStr.length > 0
      ? new Date(publishedAtStr).toISOString()
      : null

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title,
      slug,
      summary,
      body,
      status,
      category_id: categoryId,
      source_url: sourceUrl,
      source_name: sourceName,
      published_at,
      hero_image_url: heroImageUrl,
    })
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error creando artículo:", error.message)
    return
  }

  if (data) redirect(`/noticias/${data.id}`)
}

// ---------- Page ----------
export default async function NewNoticiaPage() {
  const supabase = await createSupabaseServer()

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true })

  const categories = (categoriesData as CategoryRow[] | null) ?? []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
              <span className="text-foreground">Nueva noticia</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              Crear nueva noticia
            </h1>
          </div>
        </div>

        {/* Formulario de creación */}
       <form action={createArticle}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Información Principal */}
              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Información Principal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título Interno</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      className="bg-background"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      name="slug"
                      className="bg-background font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <select
                        id="estado"
                        name="estado"
                        defaultValue="draft"
                        className="bg-background border border-border rounded-md px-3 py-2 text-sm"
                      >
                        <option value="draft">Borrador</option>
                        <option value="review">En revisión</option>
                        <option value="scheduled">Programada</option>
                        <option value="published">Publicada</option>
                        <option value="archived">Archivada</option>
                      </select>
                    </div>

        <div className="space-y-2">
  <Label htmlFor="fecha">Fecha de Publicación</Label>
  <PublishDatetimeField id="fecha" name="fecha" />
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
                    <Label htmlFor="bajada">Bajada / Resumen Editorial</Label>
                    <Textarea
                      id="bajada"
                      name="bajada"
                      rows={3}
                      className="bg-background resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cuerpo">Cuerpo de la Noticia</Label>
                    <Textarea
                      id="cuerpo"
                      name="cuerpo"
                      rows={12}
                      className="bg-background resize-none"
                    />
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
                    <select
                      id="categoria"
                      name="categoria"
                      className="bg-background border border-border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Sin categoría</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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
                    <Label htmlFor="fuente-url">URL Original</Label>
                    <Input
                      id="fuente-url"
                      name="fuente-url"
                      type="url"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuente-medio">Nombre del Medio</Label>
                    <Input
                      id="fuente-medio"
                      name="fuente-medio"
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Imagen principal */}
              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Imagen Principal</CardTitle>
                  <CardDescription>
                    Esta imagen se usa en la portada y en el detalle de la
                    noticia.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ImageUploader name="hero_image" />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Crear noticia
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Guía rápida</CardTitle>
                  <CardDescription>
                    Recomendaciones editoriales para Tutti News
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• El titular tiene que ser claro y específico.</p>
                  <p>• El resumen: 20–40 palabras, factual.</p>
                  <p>• El cuerpo: 150–400 palabras, sin opinión.</p>
                  <p>• Siempre incluir una fuente real verificable.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
