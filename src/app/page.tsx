'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The main page component that redirects to the login page.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
    );
};

export default Page;
