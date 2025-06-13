'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/auth-form';
import { useAuthStore } from '@/lib/store/auth-store';

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[550px]">
        <AuthForm imageUrl="/login-image.jpg" />
      </div>
    </div>
  );
}
