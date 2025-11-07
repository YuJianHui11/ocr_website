import Link from "next/link"
import { Card } from "@/components/ui/card"
import { FileText, FileImage, FileSpreadsheet, ImageIcon, Languages, QrCode, Barcode, Code, Merge } from "lucide-react"

const tools = [
  { name: "Jpg To Word", icon: FileImage, href: "/jpg-to-word" },
  { name: "Pdf To Text", icon: FileText, href: "/pdf-to-text" },
  { name: "Pdf To Word", icon: FileText, href: "/pdf-to-word" },
  { name: "Text To Pdf", icon: FileText, href: "/text-to-pdf" },
  { name: "Text To Word", icon: FileText, href: "/text-to-word" },
  { name: "Invert Image", icon: ImageIcon, href: "/invert-image" },
  { name: "Text To Image", icon: ImageIcon, href: "/text-to-image" },
  { name: "Image To Pdf", icon: FileImage, href: "/image-to-pdf" },
  { name: "Image Translator", icon: Languages, href: "/image-translator" },
  { name: "Qr Code Scanner", icon: QrCode, href: "/qr-code-scanner" },
  { name: "Word To Pdf", icon: FileText, href: "/word-to-pdf" },
  { name: "Pdf To Jpg", icon: FileImage, href: "/pdf-to-jpg" },
  { name: "Merge Pdf", icon: Merge, href: "/merge-pdf" },
  { name: "Jpg To Excel", icon: FileSpreadsheet, href: "/jpg-to-excel" },
  { name: "Qr Code Generator", icon: QrCode, href: "/qr-code-generator" },
  { name: "Word To Jpg", icon: FileImage, href: "/word-to-jpg" },
  { name: "Pdf To Excel", icon: FileSpreadsheet, href: "/pdf-to-excel" },
  { name: "Barcode Scanner", icon: Barcode, href: "/barcode-scanner" },
  { name: "Excel To Jpg", icon: FileImage, href: "/excel-to-jpg" },
  { name: "Pdf To Csv", icon: FileSpreadsheet, href: "/pdf-to-csv" },
  { name: "Html To Pdf", icon: Code, href: "/html-to-pdf" },
  { name: "Pdf To Html", icon: Code, href: "/pdf-to-html" },
]

export function ToolsGrid() {
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <tool.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">{tool.name}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
