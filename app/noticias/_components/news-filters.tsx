// app/noticias/_components/news-filters.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

export function NewsFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const update = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString())
    if (value === "todas" || value === "todos") newParams.delete(key)
    else newParams.set(key, value)
    newParams.set("page", "1") // reset paginado al filtrar
    router.push(`/noticias?${newParams.toString()}`)
  }

  return (
    <div className="p-4 border rounded-md flex flex-wrap gap-2 items-center">

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          defaultValue={params.get("q") ?? ""}
          placeholder="Buscar por título..."
          className="pl-9"
          onChange={(e) => update("q", e.target.value)}
        />
      </div>

      {/* Categoría */}
      <Select onValueChange={(v) => update("category", v)} defaultValue={params.get("category") ?? "todas"}>
        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas</SelectItem>
          <SelectItem value="mundo">Mundo</SelectItem>
          <SelectItem value="argentina">Argentina</SelectItem>
          <SelectItem value="zarate">Zárate</SelectItem>
        </SelectContent>
      </Select>

      {/* Estado */}
      <Select onValueChange={(v) => update("status", v)} defaultValue={params.get("status") ?? "todos"}>
        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="published">Publicada</SelectItem>
          <SelectItem value="draft">Borrador</SelectItem>
        </SelectContent>
      </Select>

      {/* IA */}
      <Select onValueChange={(v) => update("ia", v)} defaultValue={params.get("ia") ?? "todos"}>
        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="con-ia">Con IA</SelectItem>
          <SelectItem value="sin-ia">Sin IA</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
