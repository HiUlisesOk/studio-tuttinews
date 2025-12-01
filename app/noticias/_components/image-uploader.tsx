"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Image as ImageIcon } from "lucide-react"

type ImageUploaderProps = {
  name: string
  defaultUrl?: string | null
}

/**
 * Uploader “lindo”:
 * - NO sube nada a Supabase (solo file input)
 * - Muestra preview si hay archivo
 * - Mantiene el look de bloque grande con borde punteado e icono
 */
export function ImageUploader({ name, defaultUrl }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(defaultUrl ?? null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleClick = () => inputRef.current?.click()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="space-y-3">
      {/* input real del form (lo lee la server action) */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* Bloque grande clickeable, con borde punteado */}
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-lg border-2 border-dashed border-border bg-muted/10 hover:bg-muted/20 transition-colors flex flex-col items-center justify-center px-6 py-10 text-center"
      >
        {preview ? (
          <div className="w-full max-w-xl rounded-md overflow-hidden border border-border bg-background">
            {/* Usamos <img> para evitar dramas con Next/Image + blob URLs */}
            <img
              src={preview}
              alt="Vista previa de la imagen seleccionada"
              className="w-full h-56 object-cover"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-4">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">
              Haz clic para subir una imagen
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF hasta 10MB
            </p>
          </>
        )}
      </button>

      {/* Footer con nombre de archivo + botón secundario */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="truncate">
          {fileName
            ? `Seleccionado: ${fileName}`
            : defaultUrl
            ? "Usando imagen existente"
            : "Ningún archivo seleccionado"}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2"
          onClick={handleClick}
        >
          <Upload className="h-3 w-3 mr-1" />
          Elegir archivo
        </Button>
      </div>
    </div>
  )
}
