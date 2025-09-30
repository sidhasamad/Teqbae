// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { useAuth } from '../../context/AuthContext' // Fixed import path

// export default function LoginPage() {
//   const [error, setError] = useState('')
//   const { login, user } = useAuth()
//   const router = useRouter()
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

//   useEffect(() => {
//     if (user) {
//       router.push('/dashboard')
//     }
//   }, [user, router])

//   const onSubmit = async (data) => {
//     setError('')
//     const result = await login(data)
//     if (!result.success) {
//       setError(result.error)
//     }
//   }

//   if (user) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Redirecting to dashboard...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Email</label>
//           <input
//             type="email"
//             {...register('email', {
//               required: 'Email is required',
//               pattern: {
//                 value: /^\S+@\S+$/i,
//                 message: 'Invalid email address'
//               }
//             })}
//             className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//             placeholder="Enter your email"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Password</label>
//           <input
//             type="password"
//             {...register('password', {
//               required: 'Password is required',
//               minLength: {
//                 value: 4,
//                 message: 'Password must be at least 4 characters'
//               }
//             })}
//             className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//             placeholder="Enter your password"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm text-center">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
//         >
//           {isSubmitting ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
//         <p className="text-sm text-center">
//           <strong>Enter this</strong><br />
//           email:sidhaasamad@gmail.com<br/>
//           password:123456789
//         </p>
//       </div>
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function LoginPage() {
  const [error, setError] = useState('')
  const { login, user } = useAuth()
  const { theme } = useTheme()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const onSubmit = async (data) => {
    setError('')
    const result = await login(data)
    if (!result.success) {
      setError(result.error)
    }
  }

  if (user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Redirecting to dashboard...</div>
      </div>
    )
  }

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md border ${
      theme === 'dark' 
        ? 'bg-black border-gray-700 text-white' 
        : 'bg-white border-blue-200 text-blue-900'
    }`}>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Login
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full p-3 border rounded-lg ${
              theme === 'dark' 
                ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters'
              }
            })}
            className={`w-full p-3 border rounded-lg ${
              theme === 'dark' 
                ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-blue-300 text-blue-900 placeholder-gray-500'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg disabled:opacity-50 transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-blue-800 text-white hover:bg-blue-900'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className={`mt-6 p-4 rounded-lg border ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 text-white'
          : 'bg-blue-50 border-blue-200 text-blue-900'
      }`}>
        <p className="text-sm text-center">
          <strong>Enter:</strong><br />
          email: sidhaasamad@gmail.com<br/>
          password: 123456789
        </p>
      </div>
    </div>
  )
}