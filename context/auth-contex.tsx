"use client";

import React, { createContext, useEffect, useState, useContext, Dispatch, SetStateAction } from "react";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: {id: number | null, name: string, email: string, birthday: string | null, newsletter_confirmed: 0 | 1};
  setCustomer: Dispatch<SetStateAction<{ id: number | null, name: string; email: string; birthday: string | null; newsletter_confirmed: 0 | 1; }>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  shippingAddress: {address_line: string, city: string, state: string, postal_code: string, country: string, type: 'shipping', specified_in_order: false};
  setShippingAddress: Dispatch<SetStateAction<{ address_line: string, city: string, state: string, postal_code: string, country: string, type: 'shipping', specified_in_order: false }>>;
  billingAddress: {address_line: string, city: string, state: string, postal_code: string, country: string, type: 'billing', specified_in_order: false};
  setBillingAddress: Dispatch<SetStateAction<{ address_line: string, city: string, state: string, postal_code: string, country: string, type: 'billing', specified_in_order: false }>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  customer: {id: null, name: '', email: '', birthday: null, newsletter_confirmed: 0},
  setCustomer: () => {},
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  shippingAddress: {address_line: '', city: '', state: '', postal_code: '', country: '', type: 'shipping', specified_in_order: false},
  setShippingAddress: () => {},
  billingAddress: {address_line: '', city: '', state: '', postal_code: '', country: '', type: 'billing', specified_in_order: false},
  setBillingAddress: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [customer, setCustomer] = useState<{id: number | null, name: string, email: string, birthday: string | null, newsletter_confirmed: 0 | 1}>({id: null, name: '', email: '', birthday: null, newsletter_confirmed: 0});

  const [shippingAddress, setShippingAddress] = useState<{address_line: string, city: string, state: string, postal_code: string, country: string, type: 'shipping', specified_in_order: false}>({
    address_line: '', 
    city: '', 
    state: '', 
    postal_code: '', 
    country: '', 
    type: 'shipping', 
    specified_in_order: false
  });

  const [billingAddress, setBillingAddress] = useState<{address_line: string, city: string, state: string, postal_code: string, country: string, type: 'billing', specified_in_order: false}>({
    address_line: '', 
    city: '', 
    state: '', 
    postal_code: '', 
    country: '', 
    type: 'billing', 
    specified_in_order: false
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie("dracaena_access_token");

      if (token) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth-check`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.authenticated && response.status === 200) {
            setIsAuthenticated(true);
            setCustomer({
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              birthday: response.data.user.birthday,
              newsletter_confirmed: response.data.user.newsletter_confirmed as 0 | 1,
            });
            if (response.data.shipping_address !== null) {
              setShippingAddress({
                address_line: response.data.shipping_address.address_line, 
                city: response.data.shipping_address.city, 
                state: response.data.shipping_address.state, 
                postal_code: response.data.shipping_address.postal_code, 
                country: response.data.shipping_address.country, 
                type: response.data.shipping_address.type, 
                specified_in_order: response.data.shipping_address.specified_in_order,             
              });              
            }     
            
            if (response.data.billing_address !== null) {
              setBillingAddress({
                address_line: response.data.billing_address.address_line, 
                city: response.data.billing_address.city, 
                state: response.data.billing_address.state, 
                postal_code: response.data.billing_address.postal_code, 
                country: response.data.billing_address.country, 
                type: response.data.billing_address.type, 
                specified_in_order: response.data.billing_address.specified_in_order,             
              });              
            }            

          } else {
            deleteCookie("dracaena_access_token");
            setIsAuthenticated(false);
          }
        } catch (error) {
          deleteCookie("dracaena_access_token");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password });
      const { access_token } = response.data;

      const accessExpireDate = new Date(new Date().setDate(new Date().getDate() + 15));

      setCookie('dracaena_access_token', access_token, {
        expires: accessExpireDate,
        // secure: true // uncomment for production https
      });

      setIsAuthenticated(true);
      router.push('/'); // Redirect to home or dashboard
      router.refresh();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${getCookie("dracaena_access_token")}`,
        },
      });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      deleteCookie("dracaena_access_token");
      setIsAuthenticated(false);
      router.push("/auth/login");
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        customer,
        isLoading,
        login,
        logout,
        setCustomer,
        shippingAddress,
        setShippingAddress,
        billingAddress,
        setBillingAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;