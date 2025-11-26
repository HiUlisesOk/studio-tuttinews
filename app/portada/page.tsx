"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, TrendingUp, Star, GripVertical, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const featuredNews = [
  {
    id: 1,
    title: "Elecciones 2024: Resultados preliminares muestran cambio histórico",
    category: "Política",
    views: 12453,
    priority: 1,
    author: "María González",
    publishedAt: "hace 2 horas",
  },
  {
    id: 2,
    title: "Nuevo récord en exportaciones argentinas al mercado asiático",
    category: "Economía",
    views: 8721,
    priority: 2,
    author: "Carlos Pérez",
    publishedAt: "hace 5 horas",
  },
  {
    id: 3,
    title: "Selección argentina: Convocatoria para los próximos amistosos",
    category: "Deportes",
    views: 6543,
    priority: 3,
    author: "Juan Martínez",
    publishedAt: "hace 7 horas",
  },
]

const sectionNews = {
  politica: [
    { id: 4, title: "Congreso debate nuevo proyecto de ley económica", views: 2341 },
    { id: 5, title: "Acuerdo bilateral con Brasil genera expectativas", views: 1987 },
  ],
  deportes: [
    { id: 6, title: "River Plate avanza a semifinales de Copa", views: 5432 },
    { id: 7, title: "Nadal anuncia retiro del tenis profesional", views: 4123 },
  ],
  internacional: [
    { id: 8, title: "G20 se reúne en Nueva Delhi para cumbre anual", views: 3214 },
    { id: 9, title: "Nuevas tensiones en Medio Oriente preocupan a ONU", views: 2876 },
  ],
}

export default function PortadaPage() {
  const [featured, setFeatured] = useState(featuredNews)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Portada & Destacados</h1>
          <p className="text-muted-foreground text-pretty">
            Gestiona qué noticias aparecen en la portada y su orden de prioridad
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Noticias destacadas</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featured.length}</div>
              <p className="text-xs text-muted-foreground">Máximo recomendado: 5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vistas totales portada</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27.7k</div>
              <p className="text-xs text-muted-foreground">+18% vs. ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3:24</div>
              <p className="text-xs text-muted-foreground">minutos en portada</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Noticias destacadas en portada</CardTitle>
                <CardDescription>Arrastra para reordenar la prioridad de las noticias</CardDescription>
              </div>
              <Button>
                <Star className="mr-2 h-4 w-4" />
                Agregar destacada
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {featured.map((news) => (
                <div
                  key={news.id}
                  className="group flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4 hover:bg-card transition-colors"
                >
                  <button className="cursor-move text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-5 w-5" />
                  </button>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                    {news.priority}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-balance">{news.title}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {news.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src="/placeholder.svg?height=16&width=16" />
                          <AvatarFallback className="text-[8px]">
                            {news.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {news.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {news.views.toLocaleString()} vistas
                      </span>
                      <span>{news.publishedAt}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(sectionNews).map(([section, news]) => (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="capitalize">{section}</CardTitle>
                <CardDescription>Noticias en sección</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {news.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <h4 className="text-sm font-medium leading-tight text-balance">{item.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {item.views.toLocaleString()} vistas
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
