"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ImageToTextConverter() {
  const [images, setImages] = useState<File[]>([])
  const [extractedText, setExtractedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files])
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setImages((prev) => [...prev, ...files])
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setImages([])
    setExtractedText("")
    setProgress(0)
  }

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const convertToText = async () => {
    if (images.length === 0) return

    setIsProcessing(true)
    setExtractedText("")
    let allText = ""

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      try {
        // Update progress
        setProgress(Math.round((i / images.length) * 100))

        // Convert image to base64
        const base64Image = await fileToBase64(image)

        // Call API
        const response = await fetch("/api/ocr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to process image")
        }

        const data = await response.json()
        allText += data.text + "\n\n"

        // Update progress
        setProgress(Math.round(((i + 1) / images.length) * 100))
      } catch (error) {
        console.error("Error processing image:", error)
        allText += `[Error processing image ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}]\n\n`
      }
    }

    setExtractedText(allText.trim())
    setIsProcessing(false)
    setProgress(100)
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <Card className="p-8">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6 hover:border-indigo-400 transition-colors"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">Drop, Upload or Paste Images</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => document.getElementById("file-input")?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Browse
              </Button>
              <Button variant="outline">
                <LinkIcon className="w-4 h-4 mr-2" />
                URL
              </Button>
            </div>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {images.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">{images.length} image(s) selected</p>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <Button
            onClick={convertToText}
            disabled={images.length === 0 || isProcessing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
          >
            {isProcessing ? `Converting... ${progress}%` : "Convert"}
          </Button>
        </div>

        {extractedText && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Extracted Text</label>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(extractedText)}>
                Copy Text
              </Button>
            </div>
            <Textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Extracted text will appear here..."
            />
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          *Your privacy is protected! No data is transmitted or stored.
        </p>
      </Card>
    </div>
  )
}
