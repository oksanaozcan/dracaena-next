import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/auth-contex';

export const useProtectedRoute = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);
};
