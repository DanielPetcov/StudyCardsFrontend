"use client"

import { useRef, useState } from "react"
import { CloudUploadIcon, FileText, X } from "lucide-react"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "../ui/empty"
import { cn } from "@/lib/utils"

type UploadedMaterial = {
  file: File
  buffer: ArrayBuffer
}

export default function AddDeckInputBlock() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [uploadedMaterial, setUploadedMaterial] =
    useState<UploadedMaterial | null>(null)
  const [error, setError] = useState<string | null>(null)

  const maxSizeInBytes = 50 * 1024 * 1024
  const acceptedExtensions = [".pdf", ".docx", ".txt"]

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  const resetFile = () => {
    setUploadedMaterial(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const validateFile = (file: File) => {
    const lowerName = file.name.toLowerCase()
    const hasValidExtension = acceptedExtensions.some((ext) =>
      lowerName.endsWith(ext)
    )

    if (!hasValidExtension) {
      return "Only PDF, DOCX, or TXT files are allowed."
    }

    if (file.size > maxSizeInBytes) {
      return "File size must be 50MB or less."
    }

    return null
  }

  const handleFile = async (file: File) => {
    const validationError = validateFile(file)

    if (validationError) {
      setError(validationError)
      setUploadedMaterial(null)
      return
    }

    try {
      setError(null)

      const buffer = await file.arrayBuffer()

      setUploadedMaterial({
        file,
        buffer,
      })

      // If you later send this to your backend:
      // const uint8 = new Uint8Array(buffer)
      // fetch("/api/upload", { method: "POST", body: uint8 })
    } catch {
      setError("Failed to read the file. Try again.")
      setUploadedMaterial(null)
    }
  }

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await handleFile(file)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    await handleFile(file)
  }

  return (
    <div className="max-w-sm min-w-sm">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={onInputChange}
      />

      <Empty
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openFilePicker()
          }
        }}
        className={cn(
          "h-full cursor-pointer border-2 border-dashed transition-all",
          "rounded-lg",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-surface-container-low"
        )}
      >
        <EmptyHeader className="gap-3">
          <EmptyMedia
            variant="icon"
            className={cn(
              "transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
          >
            <CloudUploadIcon />
          </EmptyMedia>

          <EmptyTitle className="text-md">
            {uploadedMaterial ? "Material selected" : "Add New Material"}
          </EmptyTitle>

          {uploadedMaterial ? (
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <FileText className="size-4" />
                <span className="max-w-55 truncate">
                  {uploadedMaterial.file.name}
                </span>
              </div>
              <EmptyDescription className="text-xs">
                {(uploadedMaterial.file.size / 1024 / 1024).toFixed(2)} MB
                loaded into memory
              </EmptyDescription>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  resetFile()
                }}
                className="mx-auto mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
                Remove file
              </button>
            </div>
          ) : (
            <EmptyDescription className="text-xs">
              PDF, DOCX, or TXT (Max 50MB)
              <br />
              Click to choose or drag and drop
            </EmptyDescription>
          )}

          {error && (
            <p className="text-center text-xs text-destructive">{error}</p>
          )}
        </EmptyHeader>
      </Empty>
    </div>
  )
}
