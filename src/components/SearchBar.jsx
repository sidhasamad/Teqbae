'use client'
import { useTheme } from '../context/ThemeContext'

export default function SearchBar({ searchTerm, onSearchChange }) {
  const { themeClasses } = useTheme()

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-[500px] p-3 pl-10 border rounded-lg transition-colors duration-300 ${themeClasses.input}`}
      />
      <div className="absolute left-3 top-3 opacity-60">
        🔍
      </div>
    </div>
  )
}