"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cloud, CloudRain, Sun, Eye, MapPin, Plus, X } from "lucide-react"

const cities = [
  { id: 1, name: "Buenos Aires", temp: "24°C", condition: "Soleado", active: true, priority: 1 },
  { id: 2, name: "Córdoba", temp: "22°C", condition: "Parcialmente nublado", active: true, priority: 2 },
  { id: 3, name: "Rosario", temp: "23°C", condition: "Soleado", active: true, priority: 3 },
  { id: 4, name: "Mendoza", temp: "19°C", condition: "Nublado", active: false, priority: 4 },
]

const weatherIcons = {
  Soleado: Sun,
  "Parcialmente nublado": Cloud,
  Nublado: Cloud,
  Lluvia: CloudRain,
}

export default function ClimaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Clima</h1>
            <p className="text-muted-foreground text-pretty">Configura el widget de clima para mostrar en el portal</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar ciudad
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ciudades activas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">4 ciudades configuradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vistas del widget</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4k</div>
              <p className="text-xs text-muted-foreground">+12% vs. semana anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última actualización</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 min</div>
              <p className="text-xs text-muted-foreground">Sincronización automática</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuración general</CardTitle>
            <CardDescription>
              Configura el proveedor de datos meteorológicos y opciones de visualización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weather-provider">Proveedor de datos</Label>
                <Select defaultValue="openweather">
                  <SelectTrigger id="weather-provider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openweather">OpenWeatherMap</SelectItem>
                    <SelectItem value="weatherapi">WeatherAPI</SelectItem>
                    <SelectItem value="accuweather">AccuWeather</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="••••••••••••••••" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-update">Actualización automática</Label>
                <p className="text-sm text-muted-foreground">Sincroniza el clima cada 15 minutos</p>
              </div>
              <Switch id="auto-update" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-widget">Mostrar widget en portal</Label>
                <p className="text-sm text-muted-foreground">Visible en la barra lateral del sitio</p>
              </div>
              <Switch id="show-widget" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ciudades</CardTitle>
            <CardDescription>Gestiona las ciudades que se muestran en el widget de clima</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cities.map((city) => {
                const Icon = weatherIcons[city.condition as keyof typeof weatherIcons] || Cloud
                return (
                  <div
                    key={city.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Switch checked={city.active} />
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{city.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            Prioridad {city.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">{city.temp}</span>
                          <span>{city.condition}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vista previa del widget</CardTitle>
            <CardDescription>Así se verá el widget en el portal público</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-gradient-to-br from-accent/5 to-accent/10 p-6">
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                El Clima
              </h3>
              <div className="space-y-3">
                {cities
                  .filter((city) => city.active)
                  .map((city) => {
                    const Icon = weatherIcons[city.condition as keyof typeof weatherIcons] || Cloud
                    return (
                      <div key={city.id} className="flex items-center justify-between rounded-lg bg-card p-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-accent" />
                          <span className="font-medium">{city.name}</span>
                        </div>
                        <span className="text-lg font-bold text-primary">{city.temp}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
