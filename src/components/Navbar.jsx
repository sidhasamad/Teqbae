'use client'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from '../components/Theme'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme } = useTheme()

  return (
    <header className={`
      sticky top-0 z-50 transition-colors duration-300
      ${theme === 'light' 
        ? 'bg-white text-navy-700 ' 
        : 'bg-black text-white '
      }
    `}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-8">
            

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <span className={`text-sm font-medium hidden md:block ${
                theme === 'light' ? 'text-navy-600' : 'text-gray-300'
              }`}>
                {theme === 'light' ? 'Light' : 'Dark'}
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {user ? (
              <>
               
                <div className="flex items-center space-x-4 ml-4 pl-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    theme === 'light' 
                      ? 'bg-navy-100 text-navy-800' 
                      : 'bg-gray-800 text-white'
                  }`}>
                    👋 {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-200 
                      hover:scale-105 active:scale-95 flex items-center space-x-2
                      ${theme === 'light' 
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-md' 
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                      }
                    `}
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/login" 
                className={`
                    rounded-lg font-semibold transition-all duration-200 
                  hover:scale-95 flex items-center pl-2
                  ${theme === 'light' 
                    ? 'bg-navy-600 hover:bg-navy-700 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-200 text-black shadow-lg'
                  }
                `}
              >
                <span>🔐</span>
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, theme, icon, children }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium 
        transition-all duration-200 hover:scale-105 mx-1
        ${theme === 'light' 
          ? 'text-navy-600 hover:bg-navy-50 hover:text-navy-800' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }
      `}
    >
      <span className="text-sm">{icon}</span>
      <span>{children}</span>
    </Link>
  )
}