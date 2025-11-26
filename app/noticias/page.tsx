import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, MoreHorizontal, Sparkles } from "lucide-react"
import Link from "next/link"

const newsData = [
  {
    id: 1,
    titulo: "Crisis económica: El dólar alcanza nuevo récord histórico",
    categoria: "Argentina",
    estado: "Publicada",
    fecha: "2025-11-25 10:30",
    tieneIA: true,
    fuente: "Ámbito Financiero",
  },
  {
    id: 2,
    titulo: "Zárate: Inauguran nuevo centro de salud en el barrio sur",
    categoria: "Zárate",
    estado: "Publicada",
    fecha: "2025-11-25 09:15",
    tieneIA: true,
    fuente: "El Norte Zárate",
  },
  {
    id: 3,
    titulo: "Cambio climático: Cumbre mundial debate nuevas medidas",
    categoria: "Mundo",
    estado: "En revisión",
    fecha: "2025-11-25 08:45",
    tieneIA: true,
    fuente: "BBC News",
  },
  {
    id: 4,
    titulo: "Elecciones 2025: Todo lo que necesitas saber",
    categoria: "Argentina",
    estado: "Programada",
    fecha: "2025-11-26 06:00",
    tieneIA: false,
    fuente: "La Nación",
  },
  {
    id: 5,
    titulo: "Avances en inteligencia artificial revolucionan la medicina",
    categoria: "Mundo",
    estado: "Borrador",
    fecha: "2025-11-24 16:20",
    tieneIA: true,
    fuente: "MIT Technology Review",
  },
  {
    id: 6,
    titulo: "Infraestructura local: Reparan calles del centro histórico",
    categoria: "Zárate",
    estado: "Publicada",
    fecha: "2025-11-24 14:30",
    tieneIA: true,
    fuente: "Diario Zárate",
  },
  {
    id: 7,
    titulo: "Argentina clasifica al Mundial 2026 tras victoria épica",
    categoria: "Argentina",
    estado: "Publicada",
    fecha: "2025-11-24 22:45",
    tieneIA: true,
    fuente: "TyC Sports",
  },
  {
    id: 8,
    titulo: "Opinión: El futuro de la educación argentina",
    categoria: "Opinión",
    estado: "En revisión",
    fecha: "2025-11-25 11:00",
    tieneIA: false,
    fuente: "Editorial",
  },
]

const statusColors: Record<string, string> = {
  Publicada: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  Borrador: "bg-muted/50 text-muted-foreground border-border",
  Programada: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "En revisión": "bg-primary/20 text-primary border-primary/30",
  Archivada: "bg-destructive/20 text-destructive border-destructive/30",
}

export default function NoticiasPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Gestión de Noticias</h1>
            <p className="text-muted-foreground mt-1">Administra todas las noticias del portal</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/noticias/nueva">
              <Plus className="mr-2 h-4 w-4" />
              Nueva noticia
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar por título..." className="pl-9 bg-background" />
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
                  <SelectItem value="publicada">Publicada</SelectItem>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="revision">En revisión</SelectItem>
                  <SelectItem value="programada">Programada</SelectItem>
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
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((news) => (
                <TableRow key={news.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium max-w-md">
                    <Link href={`/noticias/${news.id}`} className="hover:text-primary transition-colors line-clamp-2">
                      {news.titulo}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {news.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[news.estado]}>
                      {news.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{news.fecha}</TableCell>
                  <TableCell>
                    {news.tieneIA ? (
                      <div className="flex items-center gap-1 text-accent">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs">Sí</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{news.fuente}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">8</span> de <span className="font-medium">156</span> noticias
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
