import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AffiliateDashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Affiliate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Affiliate Stats */}
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Total Earnings</h2>
          {/* Add earnings stats */}
        </div>
        
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Referrals</h2>
          {/* Add referral stats */}
        </div>
        
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Commission Rate</h2>
          {/* Add commission info */}
        </div>
      </div>

      {/* Referral Links Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Referral Links</h2>
        {/* Add referral link generator and management */}
      </div>

      {/* Performance Analytics */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
        {/* Add charts and analytics */}
      </div>

      {/* Marketing Materials */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Marketing Materials</h2>
        {/* Add downloadable marketing resources */}
      </div>
    </div>
  )
} 