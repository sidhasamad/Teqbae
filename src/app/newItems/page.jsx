'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import EditItemModal from "../../components/editModalItem"

export default function MyItemsPage(){
  const { user, items } = useAuth() 
  const { theme } = useTheme()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 8

  useEffect(() => {
    if(!user){
      router.push('/login')
      return 
    }
  }, [user, router])

  const safeLocalItems = Array.isArray(items) ? items : []
  
  const filteredItems = safeLocalItems.filter(item => {
    if (!item || typeof item !== 'object') return false
    
    const title = String(item.title || '')
    const body = String(item.body || '')
    const searchLower = searchTerm.toLowerCase()
    
    return title.toLowerCase().includes(searchLower) || 
           body.toLowerCase().includes(searchLower)
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const handleEdit = (item, e) => {
    e?.stopPropagation()
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-blue-900'
          }`}>
            
          </h1>
          <button
            onClick={() => router.push('/addItem')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-blue-800 text-white hover:bg-blue-900'
            }`}
          >
            Add New Item
          </button>
        </div>


        {/* Search Bar */}
        <div className={`p-4  ${
          theme === 'dark'
            ? 'bg-black border-gray-700'
            : 'bg-white border-blue-200'
        }`}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {filteredItems.length === 0 ? (
          <div className={`text-center  ${
            theme === 'dark'
              ? 'bg-black border-gray-700 text-white'
              : 'bg-white border-blue-200 text-blue-900'
          }`}>
            <p className="text-lg mb-4">
              {safeLocalItems.length === 0 ? 'No items created yet' : 'No items found matching your search'}
            </p>
            <p className={`text-sm mb-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-blue-700'
            }`}>
              {safeLocalItems.length === 0 ? 'Create your first item to see it here!' : 'Try different search terms'}
            </p>
            <button
              onClick={() => router.push('/addItem')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-blue-800 text-white hover:bg-blue-900'
              }`}
            >
              Create Your First Item
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {currentItems.map(item => (
                <div
                  key={item.id}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    theme === 'dark'
                      ? 'bg-black border-gray-700 text-white hover:border-gray-500'
                      : 'bg-white border-blue-200 text-blue-900 hover:border-blue-400'
                  }`}
                  onClick={() => router.push(`/newItems/${item.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-semibold text-lg line-clamp-1 ${
                      theme === 'dark' ? 'text-white' : 'text-blue-800'
                    }`}>
                      {item.title}
                    </h3>
                    <button
                      onClick={(e) => handleEdit(item, e)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                        theme === 'dark'
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Edit
                    </button>
                  </div>
                  <p className={`line-clamp-2 mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                  }`}>
                    {item.body}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      Your Item ID: {item.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Your Item →
                    </span>
                  </div>
                  {item.createdAt && (
                    <div className={`text-xs mt-2 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-blue-500'
                    }`}>
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  )}
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
                totalItems={filteredItems.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
      <EditItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </>
  )
}