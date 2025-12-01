import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createSupabaseServer } from "@/lib/supabase/server"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, Send } from "lucide-react"
import { HeroImageField } from "./HeroImageField"

// ---------- Tipos ----------
type PageProps = {
  // En Next 16 params es Promise en Server Components
  params: Promise<{ id: string }>
}

type ArticleRow = {
  id: string
  title: string
  slug: string
  summary: string | null
  body: string | null
  status: string
  category_id: string | null
  source_name: string | null
  source_url: string | null
  hero_image_url: string | null
  ia_raw_summary: string | null
  published_at: string | null
}

type CategoryRow = {
  id: string
  name: string
}

// ---------- SERVER ACTION ----------
export async function updateArticle(formData: FormData) {
  "use server"

  const supabase = await createSupabaseServer()

  const id = formData.get("id") as string | null
  if (!id) {
    throw new Error("Falta el id del artículo")
  }

  const titleInternal = (formData.get("title_internal") as string) ?? ""
  const slug = (formData.get("slug") as string) ?? ""
  const titlePublic = (formData.get("title_public") as string) ?? ""
  const summary = (formData.get("summary") as string) ?? ""
  const body = (formData.get("body") as string) ?? ""
  const status = (formData.get("status") as string) ?? "draft"
  const categoryId = (formData.get("category_id") as string) || null
  const publishedAtRaw = (formData.get("published_at") as string) || null

  // Traemos el artículo actual para no perder campos
  const { data: existing, error: fetchError } = await supabase
    .from("articles")
    .select("hero_image_url")
    .eq("id", id)
    .single<ArticleRow>()

  if (fetchError || !existing) {
    console.error(fetchError)
    throw new Error("No se pudo leer el artículo")
  }

  let hero_image_url = existing.hero_image_url

  const heroImage = formData.get("hero_image")

  if (heroImage && heroImage instanceof File && heroImage.size > 0) {
    const MAX_SIZE_MB = 4
    const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024

    if (heroImage.size > MAX_BYTES) {
      throw new Error(`La imagen supera el límite de ${MAX_SIZE_MB} MB.`)
    }

    const fileExt = heroImage.name.split(".").pop() || "jpg"
    const filePath = `articles/${id}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("news-images") // 👈 poné acá el bucket real
      .upload(filePath, heroImage, {
        cacheControl: "3600",
        upsert: true,
      })

    if (uploadError) {
      console.error(uploadError)
      throw new Error("No se pudo subir la imagen")
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("news-images").getPublicUrl(filePath)

    hero_image_url = publicUrl
  }

  const published_at = publishedAtRaw
    ? new Date(publishedAtRaw).toISOString()
    : null

  const { error: updateError } = await supabase
    .from("articles")
    .update({
      title: titleInternal || titlePublic, // por si querés usar el mismo
      slug,
      summary,
      body,
      status,
      category_id: categoryId,
      hero_image_url,
      published_at,
    })
    .eq("id", id)

  if (updateError) {
    console.error(updateError)
    throw new Error("No se pudo actualizar la noticia")
  }

  redirect(`/noticias/${id}/editar`)
}

// ---------- PAGE ----------
export default async function EditNoticiaPage({ params }: PageProps) {
  const { id } = await params // 👈 esto arregla el error de Promise

  const supabase = await createSupabaseServer()

  const { data: article, error } = await supabase
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
    .single<ArticleRow>()

  if (error || !article) {
    console.error(error)
    notFound()
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true })
    .returns<CategoryRow[]>()

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Editar noticia
          </h1>
          <p className="text-sm text-muted-foreground">
            Modificá el contenido, clasificación e imagen principal.
          </p>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href={`/noticias/${article.slug}`} target="_blank">
            Ver sitio público
          </Link>
        </Button>
      </div>

      <form action={updateArticle} className="space-y-8">
        <input type="hidden" name="id" value={article.id} />

        {/* Información principal */}
        <Card>
          <CardHeader>
            <CardTitle>Información Principal</CardTitle>
            <CardDescription>
              Título interno, slug y estado editorial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title_internal">Título Interno</Label>
                <Input
                  id="title_internal"
                  name="title_internal"
                  defaultValue={article.title}
                  placeholder="Título para uso interno en el panel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={article.slug}
                  placeholder="noticia-ejemplo"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  name="status"
                  defaultValue={article.status ?? "draft"}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="review">En revisión</SelectItem>
                    <SelectItem value="published">Publicada</SelectItem>
                    <SelectItem value="archived">Archivada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="published_at">Fecha de publicación</Label>
                <Input
                  id="published_at"
                  name="published_at"
                  type="datetime-local"
                  defaultValue={
                    article.published_at
                      ? new Date(article.published_at)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenido */}
        <Card>
          <CardHeader>
            <CardTitle>Contenido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_public">Titular Público</Label>
              <Input
                id="title_public"
                name="title_public"
                defaultValue={article.title}
                placeholder="Titular que verá el lector"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Bajada / Resumen Editorial</Label>
              <Textarea
                id="summary"
                name="summary"
                defaultValue={article.summary ?? ""}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Cuerpo de la noticia</Label>
              <Textarea
                id="body"
                name="body"
                defaultValue={article.body ?? ""}
                rows={10}
              />
            </div>
          </CardContent>
        </Card>

        {/* Clasificación */}
        <Card>
          <CardHeader>
            <CardTitle>Clasificación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category_id">Categoría principal</Label>
              <Select
                name="category_id"
                defaultValue={article.category_id ?? undefined}
              >
                <SelectTrigger id="category_id">
                  <SelectValue placeholder="Elegí una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* acá iría tu UI de tags si ya la tenías */}
          </CardContent>
        </Card>

        {/* Imagen principal */}
        <Card>
          <CardHeader>
            <CardTitle>Imagen Principal</CardTitle>
            <CardDescription>
              Esta imagen se usa en la portada y en el detalle de la noticia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HeroImageField currentImageUrl={article.hero_image_url} />
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex flex-col md:flex-row gap-3 justify-end">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-black font-semibold"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>

          <Button type="button" variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Enviar a revisión
          </Button>
        </div>
      </form>
    </DashboardLayout>
  )
}
