// 'use client'

// import { useAuth } from "../../context/AuthContext"
// import { useTheme } from "../../context/ThemeContext"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"

// export default function AddItem(){
//   const { user, addItem, updateItem, items } = useAuth()
//   const { theme } = useTheme()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [loading, setLoading] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [editItem, setEditItem] = useState(null)

//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

//   useEffect(() => {
//     if (!user) {
//       router.push('/login')
//       return
//     }

//     const editId = searchParams.get('edit')
//     if (editId) {
//       const id = parseInt(editId)
//       setIsEditing(true)
//       const itemToEdit = items.find(item => item.id === id)
//       if (itemToEdit) {
//         setEditItem(itemToEdit)
//         setValue('title', itemToEdit.title)
//         setValue('description', itemToEdit.body)
//         console.log('Editing item:', itemToEdit)
//       } else {
//         console.error('Item not found for editing:', id)
//       }
//     }
//   }, [user, router, searchParams, items, setValue])

//   const onSubmit = async (data) => {
//     if (!user) {
//       router.push('/login')
//       return
//     }

//     setLoading(true)
//     try {
//       if (isEditing && editItem) {
//         updateItem(editItem.id, {
//           title: data.title,
//           body: data.description
//         })
//         console.log('Item updated locally:', { id: editItem.id, ...data })
//       } else {
//         const newItem = addItem({
//           title: data.title,
//           body: data.description
//         })
//         console.log('Item created locally:', newItem)
//       }
      
//       router.push('/newItems')
//     } catch (error) {
//       console.error('Error saving item:', error)
//       alert('Error saving item. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = () => {
//     reset()
//     router.push('/items')
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Redirecting to login...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h1 className={`text-3xl font-bold mb-6 ${
//         theme === 'dark' ? 'text-white' : 'text-blue-900'
//       }`}>
//         {isEditing ? `Edit Item: ${editItem?.title || ''}` : 'Add New Item'}
//       </h1>
      
//       <div className={`p-6 rounded-lg border shadow-sm ${
//         theme === 'dark' 
//           ? 'bg-black border-gray-700' 
//           : 'bg-white border-blue-200'
//       }`}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${
//               theme === 'dark' ? 'text-white' : 'text-blue-800'
//             }`}>
//               Title *
//             </label>
//             <input
//               type="text"
//               {...register('title', {
//                 required: 'Title is required',
//                 minLength: {
//                   value: 3,
//                   message: 'Title must be at least 3 characters'
//                 },
//                 maxLength: {
//                   value: 100,
//                   message: 'Title must be less than 100 characters'
//                 }
//               })}
//               className={`w-full p-3 border rounded-lg transition-colors duration-300 ${
//                 theme === 'dark'
//                   ? 'bg-black border-gray-700 text-white placeholder-gray-400 focus:border-gray-500'
//                   : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500 focus:border-blue-500'
//               } ${errors.title ? 'border-red-500' : ''}`}
//               placeholder="Enter item title"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//             )}
//           </div>

//           <div>
//             <label className={`block text-sm font-medium mb-2 ${
//               theme === 'dark' ? 'text-white' : 'text-blue-800'
//             }`}>
//               Description *
//             </label>
//             <textarea
//               rows={6}
//               {...register('description', {
//                 required: 'Description is required',
//                 minLength: {
//                   value: 10,
//                   message: 'Description must be at least 10 characters'
//                 },
//                 maxLength: {
//                   value: 500,
//                   message: 'Description must be less than 500 characters'
//                 }
//               })}
//               className={`w-full p-3 border rounded-lg transition-colors duration-300 ${
//                 theme === 'dark'
//                   ? 'bg-black border-gray-700 text-white placeholder-gray-400 focus:border-gray-500'
//                   : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500 focus:border-blue-500'
//               } ${errors.description ? 'border-red-500' : ''}`}
//               placeholder="Enter item description"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//             )}
//             <div className={`text-sm mt-1 ${
//               theme === 'dark' ? 'text-gray-400' : 'text-blue-700'
//             }`}>
//               {errors.description ? errors.description.message : 'Provide a detailed description of the item'}
//             </div>
//           </div>

//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 disabled:opacity-50 ${
//                 loading ? 'cursor-not-allowed' : 'hover:scale-105'
//               } ${
//                 theme === 'dark'
//                   ? 'bg-white text-black hover:bg-gray-200'
//                   : 'bg-blue-800 hover:bg-blue-900'
//               }`}
//             >
//               {loading ? 'Saving...' : (isEditing ? 'Update Item' : 'Create Item')}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className={`px-6 py-3 rounded-lg transition-colors duration-300 hover:scale-105 ${
//                 theme === 'dark'
//                   ? 'bg-gray-800 text-white hover:bg-gray-700'
//                   : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
//               }`}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Info Box */}
//       <div className={`mt-6 p-4 rounded-lg border ${
//         theme === 'dark'
//           ? 'bg-black border-gray-700 text-white'
//           : 'bg-white border-blue-200 text-blue-900'
//       }`}>
//         <p className={`text-sm text-center ${
//           theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
//         }`}>
//           <strong>Note:</strong> {isEditing 
//             ? 'Editing existing item. Changes will be saved locally.' 
//             : 'Items are stored locally and will appear immediately in your items list.'
//           }
//         </p>
//         {isEditing && editItem && (
//           <p className={`text-xs text-center mt-2 ${
//             theme === 'dark' ? 'text-gray-400' : 'text-blue-600'
//           }`}>
//             Editing Item ID: {editItem.id}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { useTheme } from "../../context/ThemeContext"

// Wrap the main component with Suspense
function AddItemContent() {
  const { user, addItem, updateItem, items } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

  // We'll handle edit ID differently since useSearchParams causes issues
  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Get edit ID from URL directly instead of useSearchParams
    const urlParams = new URLSearchParams(window.location.search)
    const editId = urlParams.get('edit')
    
    if (editId) {
      const id = parseInt(editId)
      setIsEditing(true)
      const itemToEdit = items.find(item => item.id === id)
      if (itemToEdit) {
        setEditItem(itemToEdit)
        setValue('title', itemToEdit.title)
        setValue('description', itemToEdit.body)
      }
    }
  }, [user, router, items, setValue])

  const onSubmit = async (data) => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      if (isEditing && editItem) {
        updateItem(editItem.id, {
          title: data.title,
          body: data.description
        })
      } else {
        addItem({
          title: data.title,
          body: data.description
        })
      }
      router.push('/newItems')
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Error saving item. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    router.push('/items')
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-blue-900'
      }`}>
        {isEditing ? `Edit Item: ${editItem?.title || ''}` : 'Add New Item'}
      </h1>
      
      <div className={`p-6 rounded-lg border shadow-sm ${
        theme === 'dark' 
          ? 'bg-black border-gray-700' 
          : 'bg-white border-blue-200'
      }`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-blue-800'
            }`}>
              Title *
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters'
                }
              })}
              className={`w-full p-3 border rounded-lg ${
                theme === 'dark'
                  ? 'bg-black border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500'
              } ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter item title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-blue-800'
            }`}>
              Description *
            </label>
            <textarea
              rows={6}
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters'
                }
              })}
              className={`w-full p-3 border rounded-lg ${
                theme === 'dark'
                  ? 'bg-black border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500'
              } ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter item description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg text-white transition-colors ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-blue-800 hover:bg-blue-900'
              } ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Item' : 'Create Item')}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`px-6 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main export with Suspense
export default function AddItem() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddItemContent />
    </Suspense>
  )
}