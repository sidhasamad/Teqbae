


'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, items } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchPosts()
  }, [user, router])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    )
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading posts...</div>
      </div>
    )
  }

  const userItemsCount = items?.length || 0
  const totalPosts = posts.length

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-blue-900'
        }`}>
          Welcome to Dashboard
        </h1>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard" className="block">
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
            theme === 'dark'
              ? 'bg-black border-blue-500 text-white hover:border-blue-400'
              : 'bg-white border-blue-600 text-blue-900 hover:border-blue-700'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Dashboard</h3>
                <p className="text-sm opacity-70">Overview</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/items" className="block">
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
            theme === 'dark'
              ? 'bg-black border-green-500 text-white hover:border-green-400'
              : 'bg-white border-green-600 text-blue-900 hover:border-green-700'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-green-600' : 'bg-green-100'
              }`}>
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">All Items</h3>
                <p className="text-sm opacity-70">{totalPosts} items</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/addItem" className="block">
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
            theme === 'dark'
              ? 'bg-black border-purple-500 text-white hover:border-purple-400'
              : 'bg-white border-purple-600 text-blue-900 hover:border-purple-700'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-purple-600' : 'bg-purple-100'
              }`}>
                <span className="text-2xl">➕</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Add Item</h3>
                <p className="text-sm opacity-70">Create new</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/newItems" className="block">
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
            theme === 'dark'
              ? 'bg-black border-orange-500 text-white hover:border-orange-400'
              : 'bg-white border-orange-600 text-blue-900 hover:border-orange-700'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-orange-600' : 'bg-orange-100'
              }`}>
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">My Items</h3>
                <p className="text-sm opacity-70">{userItemsCount} created</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        

        <div className={`p-6 rounded-lg border ${
          theme === 'dark'
            ? 'bg-black border-gray-700 text-white'
            : 'bg-white border-blue-200 text-blue-900'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-blue-800'
          }`}>
            🚀 Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/addItem')}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              ➕ Create New Item
            </button>
            <button
              onClick={() => router.push('/items')}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              📦 Browse All Items
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg border ${
        theme === 'dark'
          ? 'bg-black border-gray-700'
          : 'bg-white border-blue-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-blue-900'
        }`}>
          Recent Posts
        </h2>
        <div className="grid gap-4">
          {currentPosts.map(post => (
            <div
              key={post.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white hover:border-gray-500'
                  : 'bg-blue-50 border-blue-200 text-blue-900 hover:border-blue-300'
              }`}
              onClick={() => router.push(`/items/${post.id}`)}
            >
              <h3 className={`font-semibold text-lg mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-blue-800'
              }`}>
                {post.title}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
              }`}>
                {post.body.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}