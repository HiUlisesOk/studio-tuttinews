import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, FolderTree, Tag } from "lucide-react"

const categorias = [
  { id: 1, nombre: "Mundo", slug: "mundo", color: "#3b82f6", noticias: 145 },
  { id: 2, nombre: "Argentina", slug: "argentina", color: "#f97316", noticias: 223 },
  { id: 3, nombre: "Zárate", slug: "zarate", color: "#10b981", noticias: 89 },
  { id: 4, nombre: "Opinión", slug: "opinion", color: "#8b5cf6", noticias: 34 },
]

const tags = [
  { id: 1, nombre: "Economía", noticias: 78 },
  { id: 2, nombre: "Política", noticias: 92 },
  { id: 3, nombre: "Clima", noticias: 45 },
  { id: 4, nombre: "Tránsito", noticias: 23 },
  { id: 5, nombre: "Cultura", noticias: 56 },
  { id: 6, nombre: "Deportes", noticias: 67 },
  { id: 7, nombre: "Salud", noticias: 41 },
  { id: 8, nombre: "Educación", noticias: 33 },
  { id: 9, nombre: "Tecnología", noticias: 29 },
  { id: 10, nombre: "Medio Ambiente", noticias: 18 },
]

export default function CategoriasPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Categorías & Tags</h1>
          <p className="text-muted-foreground mt-1">Gestiona las categorías principales y etiquetas del portal</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Categories */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FolderTree className="h-5 w-5 text-primary" />
                      Categorías Principales
                    </CardTitle>
                    <CardDescription>Secciones principales del sitio</CardDescription>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead>Nombre</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Noticias</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorias.map((cat) => (
                      <TableRow key={cat.id} className="border-border">
                        <TableCell className="font-medium">{cat.nombre}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-sm">{cat.slug}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full border border-border"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="text-xs text-muted-foreground font-mono">{cat.color}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{cat.noticias}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Create Category Form */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Crear Nueva Categoría</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cat-nombre">Nombre</Label>
                  <Input id="cat-nombre" placeholder="ej: Deportes" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-slug">Slug (URL)</Label>
                  <Input id="cat-slug" placeholder="ej: deportes" className="bg-background font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-color">Color</Label>
                  <div className="flex gap-2">
                    <Input id="cat-color" type="color" defaultValue="#f97316" className="h-10 w-20 bg-background" />
                    <Input value="#f97316" placeholder="#f97316" className="flex-1 bg-background font-mono" />
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Categoría
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-accent" />
                      Tags / Etiquetas
                    </CardTitle>
                    <CardDescription>Etiquetas para clasificación detallada</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-background p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{tag.nombre}</p>
                          <p className="text-xs text-muted-foreground">{tag.noticias} noticias</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Tag Form */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Crear Nuevo Tag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tag-nombre">Nombre del Tag</Label>
                  <Input id="tag-nombre" placeholder="ej: Infraestructura" className="bg-background" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Tag
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Categorías</span>
                  <span className="text-lg font-bold">{categorias.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Tags</span>
                  <span className="text-lg font-bold">{tags.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Categoría más activa</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Argentina
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tag más usado</span>
                  <Badge variant="outline" className="border-accent/30 text-accent">
                    Política
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
