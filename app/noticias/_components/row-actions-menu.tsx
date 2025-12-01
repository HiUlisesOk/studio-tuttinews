// app/noticias/_components/row-actions-menu.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export function RowActionsMenu({ articleId }: { articleId: string }) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => router.push(`/noticias/${articleId}`)}>
          <Eye className="h-4 w-4 mr-2" />
          Ver
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/noticias/${articleId}/editar`)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
