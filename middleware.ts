import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Add your middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Add your protected routes here
    "/dashboard/:path*",
    "/api/auth/:path*"
  ]
}
