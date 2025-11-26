"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, UserCheck, Clock, Plus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "María González",
    email: "maria@tuttinews.com",
    role: "admin",
    status: "active",
    lastActive: "Hace 5 min",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos@tuttinews.com",
    role: "editor",
    status: "active",
    lastActive: "Hace 1 hora",
  },
  {
    id: 3,
    name: "Juan Martínez",
    email: "juan@tuttinews.com",
    role: "editor",
    status: "active",
    lastActive: "Hace 3 horas",
  },
  { id: 4, name: "Ana López", email: "ana@tuttinews.com", role: "writer", status: "active", lastActive: "Hace 2 días" },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro@tuttinews.com",
    role: "writer",
    status: "inactive",
    lastActive: "Hace 1 semana",
  },
]

const roles = [
  { name: "Administrador", count: 1, color: "bg-destructive", permissions: "Acceso completo al sistema" },
  { name: "Editor", count: 2, color: "bg-primary", permissions: "Gestión de noticias y categorías" },
  { name: "Escritor", count: 2, color: "bg-accent", permissions: "Crear y editar sus propias noticias" },
]

const roleMap = {
  admin: { label: "Admin", variant: "destructive" as const },
  editor: { label: "Editor", variant: "default" as const },
  writer: { label: "Escritor", variant: "secondary" as const },
}

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Usuarios & Roles</h1>
            <p className="text-muted-foreground text-pretty">Gestiona los usuarios del sistema y sus permisos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Invitar usuario
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter((u) => u.status === "active").length} activos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Acceso completo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Editores</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Gestión de contenido</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última conexión</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 min</div>
              <p className="text-xs text-muted-foreground">María González</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Roles y permisos</CardTitle>
            <CardDescription>Configuración de los diferentes roles del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {roles.map((role) => (
                <div key={role.name} className="rounded-lg border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-lg ${role.color} flex items-center justify-center`}>
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.count} usuarios</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.permissions}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    Editar permisos
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de usuarios</CardTitle>
            <CardDescription>Todos los usuarios registrados en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => {
                const roleInfo = roleMap[user.role as keyof typeof roleMap]
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{user.name}</h3>
                          <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>
                          {user.status === "inactive" && <Badge variant="outline">Inactivo</Badge>}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{user.email}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {user.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar permisos</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar rol</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Desactivar usuario</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
