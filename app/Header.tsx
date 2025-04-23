"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white py-2 px-4">
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold no-underline">
          AI Amazona
        </Link>

        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/cart" className="p-1">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link 
            href="/auth/signin"
            className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
} 