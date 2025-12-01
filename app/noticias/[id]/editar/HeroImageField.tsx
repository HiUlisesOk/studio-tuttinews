"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Upload } from "lucide-react"

interface HeroImageFieldProps {
  currentImageUrl: string | null
  maxSizeMb?: number
}

export function HeroImageField({
  currentImageUrl,
  maxSizeMb = 4,
}: HeroImageFieldProps) {
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl)

  // Limpieza de blobs al desmontar
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)

    const file = e.target.files?.[0]
    if (!file) return

    const maxBytes = maxSizeMb * 1024 * 1024

    if (file.size > maxBytes) {
      setError(`La imagen supera el límite de ${maxSizeMb} MB. Elegí una más liviana.`)
      e.target.value = ""
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen válida.")
      e.target.value = ""
      return
    }

    const blobUrl = URL.createObjectURL(file)
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev)
      return blobUrl
    })
  }

  return (
    <div className="space-y-3">
      <Card className="border-dashed border-2 border-orange-500/50 bg-black/40">
        <CardContent className="pt-6 flex flex-col gap-4">
          {previewUrl ? (
            <div className="relative w-full overflow-hidden rounded-lg">
              <div className="aspect-[16/9] relative">
                <Image
                  src={previewUrl}
                  alt="Imagen principal de la noticia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Upload className="w-6 h-6" />
              <span>No hay imagen seleccionada</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="relative inline-flex items-center justify-center"
              asChild
            >
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Elegir archivo
                <input
                  type="file"
                  name="hero_image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>

            <p className="text-xs text-muted-foreground">
              Formatos soportados: JPG, PNG, WEBP. Máx. {maxSizeMb} MB.
            </p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-100">
          <AlertCircle className="mt-[2px] h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
