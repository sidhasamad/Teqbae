'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useTheme } from '../../../context/ThemeContext'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function MyItemDetailPage() {
  const { user, items } = useAuth() 
  console.log("All items:", items);
  
  const { theme, themeClasses } = useTheme()
  const router = useRouter()
  const params = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    const itemId = parseInt(params.id)
    console.log("Looking for item with ID:", itemId);
    
    const safeItems = Array.isArray(items) ? items : []
    const foundItem = safeItems.find(item => item.id === itemId)
    
    console.log("Found item:", foundItem);
    
    if (foundItem) {
      setItem(foundItem)
    }
    setLoading(false)
  }, [user, router, params.id, items])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading item...</div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/my-items"
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
        >
          ← Back to My Items
        </Link>
        
        <div className={`p-6 border rounded-lg shadow-sm text-center ${themeClasses.card} ${themeClasses.border}`}>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Item Not Found</h1>
          <p className="text-lg mb-4">The requested item could not be found.</p>
          <p className="text-sm opacity-70 mb-4">
            Item ID: {params.id} not found in your items.
          </p>
          <button
            onClick={() => router.push('/my-items')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.primary}`}
          >
            Back to My Items
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/newItems"
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
        >
          ← Back to My Items
        </Link>
        
        <button
          onClick={() => router.push(`/add-item?edit=${item.id}`)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.primary}`}
        >
          Edit Item
        </button>
      </div>
      
      <div className={`p-6 border rounded-lg shadow-sm ${themeClasses.card} ${themeClasses.border} border-l-4 border-l-green-500`}>
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-green-600' : 'bg-green-100 text-green-800'}`}>
            Your Item
          </span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{item.title || 'No Title'}</h1>
        <p className="text-lg leading-relaxed opacity-90 mb-6">{item.body || 'No description available'}</p>
        
        <div className="mt-6 pt-6 border-t opacity-60">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="block mb-1">Item ID:</strong>
              <span>{item.id}</span>
            </div>
            <div>
              <strong className="block mb-1">User ID:</strong>
              <span>{item.userId}</span>
            </div>
            {item.createdAt && (
              <div className="md:col-span-2">
                <strong className="block mb-1">Created:</strong>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}