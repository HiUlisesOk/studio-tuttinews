"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink, Sparkles, RefreshCw, TrendingUp, Activity } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sources = [
  {
    id: 1,
    name: "Reuters",
    url: "https://reuters.com",
    active: true,
    category: "Internacional",
    articlesImported: 245,
    lastSync: "hace 10 min",
  },
  {
    id: 2,
    name: "La Nación",
    url: "https://lanacion.com.ar",
    active: true,
    category: "Nacional",
    articlesImported: 189,
    lastSync: "hace 25 min",
  },
  {
    id: 3,
    name: "Clarín",
    url: "https://clarin.com",
    active: true,
    category: "Nacional",
    articlesImported: 167,
    lastSync: "hace 1 hora",
  },
  {
    id: 4,
    name: "Infobae",
    url: "https://infobae.com",
    active: false,
    category: "General",
    articlesImported: 98,
    lastSync: "hace 3 horas",
  },
]

const aiModels = [
  { id: 1, name: "GPT-4", provider: "OpenAI", status: "active", usage: "87%" },
  { id: 2, name: "Claude 3", provider: "Anthropic", status: "active", usage: "12%" },
  { id: 3, name: "Gemini Pro", provider: "Google", status: "standby", usage: "1%" },
]

export default function FuentesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Fuentes & IA</h1>
            <p className="text-muted-foreground text-pretty">
              Gestiona las fuentes de noticias y la configuración de resumen con IA
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar fuente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nueva fuente de noticias</DialogTitle>
                <DialogDescription>Agrega una nueva fuente RSS o sitio web para importar noticias</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="source-name">Nombre de la fuente</Label>
                  <Input id="source-name" placeholder="Ej: La Nación" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-url">URL o Feed RSS</Label>
                  <Input id="source-url" type="url" placeholder="https://example.com/rss" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-category">Categoría principal</Label>
                  <Select>
                    <SelectTrigger id="source-category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nacional">Nacional</SelectItem>
                      <SelectItem value="internacional">Internacional</SelectItem>
                      <SelectItem value="politica">Política</SelectItem>
                      <SelectItem value="economia">Economía</SelectItem>
                      <SelectItem value="deportes">Deportes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="source-active">Activar fuente</Label>
                  <Switch id="source-active" defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Agregar fuente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuentes activas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">4 fuentes totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artículos importados</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">699</div>
              <p className="text-xs text-muted-foreground">+127 esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resúmenes generados</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">523</div>
              <p className="text-xs text-muted-foreground">74.8% del total</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fuentes de noticias</CardTitle>
            <CardDescription>Administra las fuentes RSS y sitios web de donde se importan noticias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Switch checked={source.active} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{source.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {source.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1"
                        >
                          {source.url}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <span className="text-sm text-muted-foreground">
                          {source.articlesImported} artículos importados
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{source.lastSync}</span>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Configuración de IA
            </CardTitle>
            <CardDescription>Configura los modelos de IA para generar resúmenes automáticos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Modelos activos</h3>
              <div className="space-y-3">
                {aiModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-4">
                      <Sparkles className="h-5 w-5 text-accent" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{model.name}</h4>
                          <Badge variant={model.status === "active" ? "default" : "secondary"} className="text-xs">
                            {model.status === "active" ? "Activo" : "Standby"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{model.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{model.usage}</div>
                      <div className="text-xs text-muted-foreground">uso actual</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-sm font-medium">Prompt del sistema</h3>
              <Textarea
                placeholder="Instrucciones para el modelo de IA..."
                className="min-h-[120px] font-mono text-sm"
                defaultValue="Eres un asistente que resume noticias de manera concisa y objetiva. Genera un resumen de máximo 150 palabras que capture los puntos principales del artículo."
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <div>
                <Label htmlFor="auto-summary">Generar resúmenes automáticamente</Label>
                <p className="text-sm text-muted-foreground">Crea resúmenes con IA al importar noticias</p>
              </div>
              <Switch id="auto-summary" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
