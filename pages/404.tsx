import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/")
  },[router])

  return 
}

export default ErrorPage