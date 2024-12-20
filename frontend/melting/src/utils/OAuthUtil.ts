import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext.tsx'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL

export default function OAuthRedirectHandler() {
  const navigate = useNavigate()
  const { provider } = useParams<{ provider: string }>()
  const { login } = useAuth()

  useEffect(() => {
    if (!provider) {
      console.error('Provider not specified')
      return
    }

    const redirectUrl = encodeURIComponent(
      `${VITE_REDIRECT_URL}/login/callback/${provider}`,
    )

    fetch(
      `${VITE_API_BASE_URL}/oauth2/authorize/${provider}?redirect_url=${redirectUrl}`,
      {
        mode: 'no-cors',
        // credentials: "include"
      },
    )
  }, [provider])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const init = params.get('init')

    login()
    if (init === 'false') {
      navigate('/signup')
    } else if (init === 'true') {
      navigate('/main')
    } else {
      console.error('Invalid redirect URL')
    }
  }, [navigate, login])

  return null
}
