


'use client'

import { createContext, useState, useContext, useEffect } from "react"

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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 
  const [items, setItems] = useState([]) 

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }

        const savedItems = localStorage.getItem('userItems')
        if (savedItems) {
          setItems(JSON.parse(savedItems))
        } else {
          setItems(initialItems)
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
        setItems(initialItems)
      } finally {
        setLoading(false)
      }
    }

    loadFromStorage()
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('userItems', JSON.stringify(items))
    }
  }, [items])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const foundUser = mockUsers.find(u => 
        u.email === credentials.email && u.password === credentials.password
      )
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
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
    localStorage.removeItem('user')
  }

  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(),
      userId: user?.id || 1,
      createdAt: new Date().toISOString()
    }
    setItems(prev => [itemWithId, ...prev])
    return itemWithId
  }

  const updateItem = (itemId, updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() } : item
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