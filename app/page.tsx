import { ImageToTextConverter } from "@/components/image-to-text-converter"
import { Header } from "@/components/header"
import { ToolsGrid } from "@/components/tools-grid"
import { InfoSection } from "@/components/info-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Image to Text Converter</h1>
          <p className="text-gray-600 text-lg">An online image to text converter to extract text from images.</p>
        </div>

        <ImageToTextConverter />

        <ToolsGrid />

        <InfoSection />
      </main>
    </div>
  )
}
