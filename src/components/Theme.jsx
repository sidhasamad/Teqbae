// 'use client'
// import { useTheme } from '../context/ThemeContext'

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme()

//   return (
//     <button
//       onClick={toggleTheme}
//       className={`
//         relative inline-flex h-6 w-11 items-center rounded-full 
//         transition-all duration-300 ease-in-out
//         focus:outline-none focus:ring-2 focus:ring-offset-2
//         ${theme === 'dark' ? 'bg-white focus:ring-white' : 'bg-navy-600 focus:ring-navy-600'}
//       `}
//       aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//     >
//       <span className="sr-only">
//         {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
//       </span>
      
//       <span
//         className={`
//           inline-block h-4 w-4 transform rounded-full shadow-lg 
//           transition-transform duration-300 ease-in-out
//           ${theme === 'dark' ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'}
//           flex items-center justify-center
//         `}
//       >
//         <span className="text-xs">
//           {theme === 'light' ? '☀️' : '🌙'}
//         </span>
//       </span>
//     </button>
//   )
// }

'use client'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark' ? 'bg-white focus:ring-white' : 'bg-blue-800 focus:ring-blue-800'}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
      
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full shadow-lg 
          transition-transform duration-300 ease-in-out
          ${theme === 'dark' ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'}
          flex items-center justify-center
        `}
      >
        <span className="text-xs">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </span>
    </button>
  )
}