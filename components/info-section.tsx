import { Card } from "@/components/ui/card"

export function InfoSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Extracting text from an image is very easy using our tool.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Do not waste your time converting JPGs or PNGs to text manually. Our tool will not take more than a minute
            to convert an image to text.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our picture to text converter is a free online text extraction tool that converts images into text in no
            time with 100% accuracy. It uses advanced AI technology to get the text from images with a single click.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How does Image to text converter work?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You don't have to do much to copy text from an image if you don't know how to convert a JPEG or PNG to text.
            Simply follow these steps.
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Upload your image or drag & drop it.</li>
            <li>Or enter the URL if you have a link to the image.</li>
            <li>
              Hit the <strong>Convert</strong> button.
            </li>
            <li>Copy the text to the clipboard or save it as a document.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features - Image to Text Converter</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Free to use</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Capturing text from images is totally free. You don't have to spend a single penny to extract captions from
            your favorite photos. We don't ask our users to get registered with us. You can grab the text and flee away
            whenever you want.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Based Extraction</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            We have worked really hard to come up with a solution that is really worth it. Our tool is powered with
            tesseract-ocr - an open-source software developed by Hewlett-Packard, funded and maintained by Google. It
            performs AI-based extraction of text to provide 100% accuracy.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Languages Support</h3>
          <p className="text-gray-700 leading-relaxed">
            This image to text generator supports multiple languages. It means you can extract text in various languages
            such as English, Spanish, Russian, Dutch, Italian, Portuguese, Indonesian, German, French, Korean, Danish,
            Czech, Swedish, Polish, Romanian, Thai, Vietnamese, Turkish, Japanese, Chinese, Georgian, Finnish, and
            Arabic.
          </p>
        </div>
      </Card>
    </div>
  )
}
