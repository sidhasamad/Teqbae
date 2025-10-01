import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to Next.js mini project</h1>

      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </Link>
        <Link
          href="/dashboard"
          className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  )
}