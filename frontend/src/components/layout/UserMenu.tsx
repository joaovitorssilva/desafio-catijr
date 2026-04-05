import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getMe } from '../../api/endpoints/auth'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [localUser, setLocalUser] = useState(user)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalUser(user)
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token')
      if (accessToken && !localUser) {
        const userData = await getMe(accessToken)
        setLocalUser(userData)
      }
    }
    if (isAuthenticated) {
      fetchUser()
    }
  }, [isAuthenticated, localUser])

  const displayName = localUser?.name || 'User'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-1 rounded-xl hover:bg-bgDark cursor-pointer transition ease-out duration-300 "
      >
        <MdAccountCircle className='w-6 h-6' />
        <span className="font-semibold truncate uppercase text-sm max-w-[120px]">{displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-bg border border-zinc-50 rounded-xl shadow-lg  z-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-danger transition ease-out 200 hover:text-red-500 cursor-pointer"
          >
            <MdLogout />
            Sair
          </button>
        </div>
      )}
    </div>
  )
}
