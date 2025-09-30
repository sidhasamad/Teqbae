
// 'use client'
// import { useState, useEffect } from 'react'
// import { useAuth } from '../../context/AuthContext'
// // import SearchBar from '../../components/SearchBar'
// import Pagination from '../../components/Pagination'
// import { useTheme } from '../../context/ThemeContext'
// import { useRouter } from 'next/navigation'

// export default function DashboardPage() {
//   const { user,items } = useAuth()
//   const { themeClasses } = useTheme()
//   const router = useRouter()
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const postsPerPage = 5

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!user) {
//       router.push('/login')
//       return
//     }
//     fetchPosts()
//   }, [user, router])

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//       const data = await response.json()
//       console.log("datas",data);
      
//       setPosts(data)
      
      
//     } catch (error) {
//       console.error('Error fetching posts:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Redirecting to login...</div>
//       </div>
//     )
//   }

//   const filteredPosts = posts.filter(post =>
//     post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     post.body.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const indexOfLastPost = currentPage * postsPerPage
//   const indexOfFirstPost = indexOfLastPost - postsPerPage
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Loading posts...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <p className="text-lg">Welcome back, {user?.name}!</p>

//       {/* <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} /> */}

//      <div className="grid gap-4">
//         {currentPosts.map(post => (
//           <div
//             key={post.id}
//             className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${themeClasses.card} ${themeClasses.border} border`}
//             onClick={() => router.push(`/items/${post.id}`)}
//           >
//             <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//             <p className="opacity-80">{post.body}</p>
//           </div>
//         ))}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalItems={filteredPosts.length}
//         itemsPerPage={postsPerPage}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   )
// }


'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Pagination from '../../components/Pagination'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, items } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const postsPerPage = 5

  // Redirect to login if not authenticated
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
      console.log("datas", data)
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

      {/* Search Bar (commented out but styled if you enable it) */}
      {/* <div className={`p-4 rounded-lg border ${
        theme === 'dark' 
          ? 'bg-black border-gray-700' 
          : 'bg-white border-blue-200'
      }`}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div> */}

      <div className="grid gap-4">
        {currentPosts.map(post => (
          <div
            key={post.id}
            className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-black border-gray-700 text-white hover:border-gray-500'
                : 'bg-white border-blue-200 text-blue-900 hover:border-blue-400'
            }`}
            onClick={() => router.push(`/items/${post.id}`)}
          >
            <h3 className={`font-semibold text-lg mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-blue-800'
            }`}>
              {post.title}
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
            }`}>
              {post.body}
            </p>
          </div>
        ))}
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
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}