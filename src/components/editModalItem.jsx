'use client'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function EditItemModal({ isOpen, onClose, item }) {
  const { updateItem } = useAuth()
  const { themeClasses } = useTheme()
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

  // Reset form when item changes or modal opens
  useEffect(() => {
    if (item && isOpen) {
      setValue('title', item.title || '')
      setValue('description', item.body || '')
    }
  }, [item, isOpen, setValue])

  const onSubmit = (data) => {
    if (item) {
      updateItem(item.id, {
        title: data.title,
        body: data.description
      })
      console.log('Item updated:', { id: item.id, ...data })
      handleClose()
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  if (!isOpen || !item) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg ${themeClasses.card} ${themeClasses.border} border`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Item</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Title must be less than 100 characters'
                  }
                })}
                className={`w-full p-3 border rounded-lg transition-colors duration-300 ${themeClasses.input} ${
                  errors.title ? 'border-red-500' : ''
                }`}
                placeholder="Enter item title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                rows={6}
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters'
                  },
                  maxLength: {
                    value: 500,
                    message: 'Description must be less than 500 characters'
                  }
                })}
                className={`w-full p-3 border rounded-lg transition-colors duration-300 ${themeClasses.input} ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Enter item description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
              <div className="text-sm opacity-70 mt-1">
                {errors.description ? errors.description.message : 'Provide a detailed description of the item'}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 ${themeClasses.button.primary}`}
              >
                Update Item
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={`px-6 py-3 rounded-lg transition-colors duration-300 ${themeClasses.button.secondary}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}