"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Globe, Bell, Shield, Database, Palette } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Configuración</h1>
          <p className="text-muted-foreground text-pretty">Ajusta las configuraciones generales del portal y del CMS</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Información del sitio
            </CardTitle>
            <CardDescription>Configuración general del portal de noticias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nombre del sitio</Label>
                <Input id="site-name" defaultValue="Tutti News" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL principal</Label>
                <Input id="site-url" type="url" defaultValue="https://tuttinews.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-tagline">Slogan del sitio</Label>
              <Input id="site-tagline" defaultValue="Tu fuente confiable de noticias" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Descripción (SEO)</Label>
              <Textarea
                id="site-description"
                placeholder="Descripción del sitio para motores de búsqueda..."
                className="min-h-[80px]"
                defaultValue="Portal de noticias argentino con cobertura nacional e internacional. Noticias de política, economía, deportes y más."
              />
            </div>
            <Button>Guardar cambios</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>Configura las notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">Recibe alertas importantes por correo</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de nuevas noticias</Label>
                <p className="text-sm text-muted-foreground">Notificación cuando se publica una noticia</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de comentarios</Label>
                <p className="text-sm text-muted-foreground">Notificación de nuevos comentarios pendientes</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Resumen diario</Label>
                <p className="text-sm text-muted-foreground">Recibe un resumen diario de actividad</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription>Configuraciones de seguridad y privacidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de dos factores</Label>
                <p className="text-sm text-muted-foreground">Protege tu cuenta con 2FA</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cerrar sesión automáticamente</Label>
                <p className="text-sm text-muted-foreground">Después de 30 minutos de inactividad</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Requerir aprobación para publicar</Label>
                <p className="text-sm text-muted-foreground">Los editores deben aprobar antes de publicar</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Base de datos
            </CardTitle>
            <CardDescription>Información y mantenimiento de la base de datos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Total de noticias</Label>
                <p className="text-2xl font-bold mt-1">1,247</p>
              </div>
              <div>
                <Label>Tamaño de la base de datos</Label>
                <p className="text-2xl font-bold mt-1">342 MB</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Button variant="outline">Optimizar base de datos</Button>
              <Button variant="outline">Crear backup</Button>
              <Button variant="outline" className="text-destructive bg-transparent">
                Limpiar caché
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apariencia
            </CardTitle>
            <CardDescription>Personaliza la apariencia del portal público</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Color primario</Label>
              <div className="flex items-center gap-2">
                <Input type="color" defaultValue="#f97316" className="w-20 h-10" />
                <Input defaultValue="#f97316" className="font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color de acento</Label>
              <div className="flex items-center gap-2">
                <Input type="color" defaultValue="#3b82f6" className="w-20 h-10" />
                <Input defaultValue="#3b82f6" className="font-mono" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo oscuro en portal público</Label>
                <p className="text-sm text-muted-foreground">Permitir a los usuarios cambiar al modo oscuro</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Guardar configuración de apariencia</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
