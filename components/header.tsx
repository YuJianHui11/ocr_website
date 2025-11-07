import Link from "next/link"
import { MessageSquare, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="flex items-center justify-between py-3 border-b border-white/20">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">LIFETIME</span>
              <span className="text-white/80">SUBSCRIPTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">1000</span>
              <span className="text-white/80 text-xs">DAYS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">150,000</span>
              <span className="text-white/80 text-xs">IMAGES</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">GET OFFER ONLY IN</span>
            <span className="text-2xl font-bold">$79.99</span>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">GET NOW</Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">📝</div>
              Image To Text
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/image-translator" className="hover:text-white/80 transition-colors">
                Image Translator
              </Link>
              <Link href="/jpg-to-word" className="hover:text-white/80 transition-colors">
                JPG To Word
              </Link>
              <Link href="/jpg-to-excel" className="hover:text-white/80 transition-colors">
                JPG to Excel
              </Link>
              <Link href="/pdf-to-excel" className="hover:text-white/80 transition-colors">
                PDF To Excel
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Star className="w-4 h-4 mr-2" />
              Pricing
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
