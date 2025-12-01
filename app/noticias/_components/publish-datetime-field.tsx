"use client"

import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

type PublishDatetimeFieldProps = {
  id: string
  name: string
}

export function PublishDatetimeField({ id, name }: PublishDatetimeFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (!inputRef.current) return

    // En navegadores modernos intenta abrir el picker nativo

    if (typeof inputRef.current.showPicker === "function") {

      inputRef.current.showPicker()
    } else {
      // Fallback: simplemente focus
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        id={id}
        name={name}
        type="datetime-local"
        className="bg-background"
      />
      <Button type="button" variant="outline" size="icon" onClick={handleClick}>
        <Calendar className="h-4 w-4" />
      </Button>
    </div>
  )
}
