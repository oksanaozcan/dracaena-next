"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useAuth } from '@/context/auth-contex';

const GoogleCallback = () => {
    const router = useRouter();
    const { setCustomer, setIsAuthenticated } = useAuth();

    useEffect(() => {      
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const customerData = params.get('customer');
            const accessTokenData = params.get('access_token');

            if (customerData && accessTokenData) {
                const cust = JSON.parse(decodeURIComponent(customerData));
                const acc_token = decodeURIComponent(accessTokenData);

                const accessExpireDate = new Date(new Date().setDate(new Date().getDate() + 15));

                setCookie('dracaena_access_token', acc_token, {
                    expires: accessExpireDate,
                    // secure: true // uncomment for production https
                });

                setCustomer(cust);
                setIsAuthenticated(true);

                router.push('/dashboard'); // Redirect to home or dashboard
            } else {
                router.push('/auth/login');
            }
        };

        handleCallback();
    }, [router, setCustomer, setIsAuthenticated]);

    return <div>Loading...</div>;
};

export default GoogleCallback;