


'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Pagination from '../../components/pagination'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, items, loading: authLoading } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const postsPerPage = 5

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    fetchPosts()
  }, [user, router, authLoading])

  // Get page from URL on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const pageFromUrl = urlParams.get('page')
      if (pageFromUrl) {
        const pageNum = parseInt(pageFromUrl)
        if (pageNum !== currentPage) {
          setCurrentPage(pageNum)
        }
      }
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      const data = await response.json()
      console.log("datas", data)
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('page', page.toString())
      window.history.replaceState({}, '', url.toString())
    }
  }

  const handleEdit = (postId, e) => {
    e.stopPropagation() 
    router.push(`/items/${postId}?edit=true`)
  }

  const handleView = (postId) => {
    router.push(`/items/${postId}`)
  }

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    )
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className={`text-3xl font-bold ${
        theme === 'dark' ? 'text-white' : 'text-blue-900'
      }`}>
        Dashboard
      </h1>
      
      <p className={`text-lg ${
        theme === 'dark' ? 'text-white' : 'text-blue-800'
      }`}>
        Welcome back, {user?.name}!
      </p>

      {/* Table */}
      <div className={`rounded-lg border overflow-hidden ${
        theme === 'dark'
          ? 'bg-black border-gray-700'
          : 'bg-white border-blue-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${
              theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
            }`}>
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-blue-900'
                }`}>
                  ID
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-blue-900'
                }`}>
                  Title
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-blue-900'
                }`}>
                  Content
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-blue-900'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr 
                  key={post.id}
                  className={`cursor-pointer transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'hover:bg-gray-800 border-b border-gray-700'
                      : 'hover:bg-blue-50 border-b border-blue-100'
                  }`}
                  onClick={() => handleView(post.id)}
                >
                  <td className={`px-4 py-3 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.id}
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-blue-900'
                  }`}>
                    <div className="max-w-xs" title={post.title}>
                      {post.title}
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="max-w-md" title={post.body}>
                      {post.body}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => handleEdit(post.id, e)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentPosts.length === 0 && (
          <div className={`text-center py-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p className="text-lg">No posts found</p>
          </div>
        )}
      </div>

      <div className={`p-4 rounded-lg border ${
        theme === 'dark'
          ? 'bg-black border-gray-700'
          : 'bg-white border-blue-200'
      }`}>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPosts.length}
          itemsPerPage={postsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}