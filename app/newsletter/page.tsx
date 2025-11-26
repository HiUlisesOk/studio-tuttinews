"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, TrendingUp, Send, Plus, Calendar } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const campaigns = [
  {
    id: 1,
    title: "Resumen Semanal - 20 Nov",
    sent: "20/11/2024",
    recipients: 12453,
    openRate: "42.3%",
    status: "sent",
  },
  { id: 2, title: "Noticias Destacadas", sent: "18/11/2024", recipients: 11987, openRate: "38.7%", status: "sent" },
  { id: 3, title: "Edición Especial Elecciones", sent: "Borrador", recipients: 0, openRate: "-", status: "draft" },
]

const subscriberData = [
  { month: "Ene", subscribers: 8400 },
  { month: "Feb", subscribers: 9100 },
  { month: "Mar", subscribers: 9800 },
  { month: "Abr", subscribers: 10200 },
  { month: "May", subscribers: 11100 },
  { month: "Jun", subscribers: 12453 },
]

export default function NewsletterPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Newsletter</h1>
            <p className="text-muted-foreground text-pretty">Gestiona suscriptores y envía boletines informativos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva campaña
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suscriptores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,453</div>
              <p className="text-xs text-muted-foreground">+342 este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de apertura</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">40.5%</div>
              <p className="text-xs text-muted-foreground">Promedio últimas 10 campañas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Envíos este mes</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">24,890 emails enviados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2.8%</div>
              <p className="text-xs text-muted-foreground">vs. mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de suscriptores</CardTitle>
            <CardDescription>Evolución de la base de suscriptores en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={subscriberData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="subscribers"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campañas recientes</CardTitle>
            <CardDescription>Historial de newsletters enviados y borradores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{campaign.title}</h3>
                      <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>
                        {campaign.status === "sent" ? "Enviado" : "Borrador"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {campaign.sent}
                      </span>
                      {campaign.recipients > 0 && (
                        <>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {campaign.recipients.toLocaleString()} destinatarios
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {campaign.openRate} apertura
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {campaign.status === "draft" ? (
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crear nueva campaña</CardTitle>
            <CardDescription>Redacta y programa un nuevo envío de newsletter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-title">Título de la campaña</Label>
              <Input id="campaign-title" placeholder="Ej: Resumen Semanal - 25 Nov" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-subject">Asunto del email</Label>
              <Input id="campaign-subject" placeholder="Ej: Las noticias más importantes de la semana" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-content">Contenido</Label>
              <Textarea
                id="campaign-content"
                placeholder="Escribe el contenido del newsletter..."
                className="min-h-[200px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Enviar ahora
              </Button>
              <Button variant="outline">Guardar borrador</Button>
              <Button variant="outline">Vista previa</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
