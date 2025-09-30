'use client'
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const themeClasses = {
    background: theme === 'dark' ? 'bg-black' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-blue-900',
    card: theme === 'dark' ? 'bg-black text-white' : 'bg-white text-blue-900',
    border: theme === 'dark' ? 'border-gray-700' : 'border-blue-200',
    input: theme === 'dark' ? 'bg-black border-gray-700 text-white placeholder-gray-400' : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500',
    button: {
      primary: theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-800 text-white hover:bg-blue-900',
      secondary: theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-100 hover:bg-blue-200'
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeClasses }}>
      <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}