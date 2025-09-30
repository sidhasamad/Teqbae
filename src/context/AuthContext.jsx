

'use client'

import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

const mockUsers = [
  {
    id: 1,
    name: 'sidha samad',
    email: "sidhaasamad@gmail.com",
    password: "1234567",
  }
]

const initialItems = [
  {
    id: 1,
    title: "Welcome to Dashboard",
    body: "This is your first item. Create more items to see them here!",
    userId: 1
  }
]

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([]) 

  const login = async (credentials) => {
    try {
      setLoading(true)
      const foundUser = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password)
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        }
        setUser(userData)
        return { success: true }
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(),
      userId: user?.id || 1
    }
    setItems(prev => [itemWithId, ...prev])
    return itemWithId
  }

  const updateItem = (itemId, updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updatedItem } : item
    ))
  }

  return (
    <AuthContext.Provider value={{
      user, 
      login, 
      logout, 
      loading, 
      items, 
      addItem, 
      updateItem
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}