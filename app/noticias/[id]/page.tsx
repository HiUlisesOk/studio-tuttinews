import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Sparkles, Save, Send, Calendar, Upload, Copy, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function EditNoticiaPage() {
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
              Crisis económica: El dólar alcanza nuevo récord histórico
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
                    defaultValue="Crisis económica: El dólar alcanza nuevo récord histórico"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    defaultValue="crisis-economica-dolar-record-historico"
                    className="bg-background font-mono text-sm"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select defaultValue="publicada">
                      <SelectTrigger id="estado" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="borrador">Borrador</SelectItem>
                        <SelectItem value="revision">En revisión</SelectItem>
                        <SelectItem value="programada">Programada</SelectItem>
                        <SelectItem value="publicada">Publicada</SelectItem>
                        <SelectItem value="archivada">Archivada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha de Publicación</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fecha"
                        type="datetime-local"
                        defaultValue="2025-11-25T10:30"
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

            {/* Content */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Contenido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titular">Titular Público</Label>
                  <Input
                    id="titular"
                    defaultValue="El dólar alcanza un nuevo máximo histórico en medio de la crisis"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bajada">Bajada / Resumen Editorial</Label>
                  <Textarea
                    id="bajada"
                    rows={3}
                    defaultValue="La moneda estadounidense superó la barrera de los $1200 en el mercado paralelo, generando preocupación en el sector empresarial y entre los ahorristas."
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
                      defaultValue="Buenos Aires - La jornada de hoy marcó un hito en la historia económica argentina, con el dólar paralelo alcanzando un valor récord de $1215 en el mercado informal, superando ampliamente las proyecciones más pesimistas de los analistas financieros.

El incremento del 4.5% en un solo día refleja la creciente incertidumbre económica que atraviesa el país, en un contexto de alta inflación y reservas internacionales en descenso. Economistas consultados atribuyen este fenómeno a múltiples factores, incluyendo la falta de un plan económico claro por parte del gobierno y las expectativas devaluatorias del mercado.

En declaraciones a la prensa, el ministro de Economía intentó transmitir calma, asegurando que 'el gobierno tiene las herramientas necesarias para estabilizar la situación cambiaria en el corto plazo'. Sin embargo, el mercado reaccionó con escepticismo ante estas declaraciones..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classification */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Clasificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría Principal</Label>
                  <Select defaultValue="argentina">
                    <SelectTrigger id="categoria" className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mundo">Mundo</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="zarate">Zárate</SelectItem>
                      <SelectItem value="opinion">Opinión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

            {/* Source */}
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
                    defaultValue="https://www.ambito.com/finanzas/dolar/..."
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuente-medio">Nombre del medio</Label>
                  <Input id="fuente-medio" defaultValue="Ámbito Financiero" className="bg-background" />
                </div>
              </CardContent>
            </Card>

            {/* Image */}
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
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="imagen-ia" />
                  <Label htmlFor="imagen-ia" className="text-sm font-normal">
                    Usar imagen generada por IA
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
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

            {/* AI Summary */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Resumen IA
                  </CardTitle>
                  <Badge variant="outline" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                    Activo
                  </Badge>
                </div>
                <CardDescription>Generado automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    La moneda estadounidense superó los $1200 en el mercado paralelo argentino, marcando un récord
                    histórico. El incremento del 4.5% en un día refleja la incertidumbre económica actual. Analistas
                    señalan múltiples factores, incluida la falta de un plan económico claro y expectativas
                    devaluatorias.
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

            {/* Stats */}
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
