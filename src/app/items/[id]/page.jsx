'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useTheme } from '../../../context/ThemeContext'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function ItemDetailPage() {
  const { user } = useAuth()
  const { themeClasses } = useTheme()
  const router = useRouter()
  const params = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    if (params && params.id) {
      fetchItem()
    } else {
      setError('Invalid item ID')
      setLoading(false)
    }
  }, [user, router, params])

  const fetchItem = async () => {
    try {
      setLoading(true)
      setError('')
      
      const itemId = params?.id
      if (!itemId) {
        throw new Error('Item ID not found')
      }
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`)
      
      if (!response.ok) {
        throw new Error('Item not found')
      }
      
      const data = await response.json()
      setItem(data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching item:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading item details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/items"
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
        >
          ← Back to Items
        </Link>
        
        <div className={`p-6 border rounded-lg shadow-sm text-center ${themeClasses.card} ${themeClasses.border}`}>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push('/items')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.primary}`}
          >
            Back to Items
          </button>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Item not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/items"
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
        >
          ← Back to Items
        </Link>
        
        <button
          onClick={() => router.push(`/add-item?edit=${item?.id || ''}`)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.primary}`}
        >
          Edit Item
        </button>
      </div>
      
      <div className={`p-6 border rounded-lg shadow-sm ${themeClasses.card} ${themeClasses.border}`}>
        <h1 className="text-3xl font-bold mb-4">{item?.title}</h1>
        <p className="text-lg leading-relaxed opacity-90 mb-6">{item?.body}</p>
        
        <div className="mt-6 pt-6 border-t opacity-60">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="block mb-1">Item ID:</strong>
              <span>{item?.id}</span>
            </div>
            <div>
              <strong className="block mb-1">User ID:</strong>
              <span>{item?.userId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 border rounded-lg shadow-sm ${themeClasses.card} ${themeClasses.border}`}>
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/items')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
          >
            View All Items
          </button>
          <button
            onClick={() => router.push('/addItem')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${themeClasses.button.primary}`}
          >
            Add New Item
          </button>
        </div>
      </div>
    </div>
  )
}