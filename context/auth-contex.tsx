"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: {name: string, email: string, birthday: string | null, newsletter_confirmed: 0 | 1};
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  customer: {name: '', email: '', birthday: null, newsletter_confirmed: 0},
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [customer, setCustomer] = useState<{name: string, email: string, birthday: string | null, newsletter_confirmed: 0 | 1}>({name: '', email: '', birthday: null, newsletter_confirmed: 0});
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
              name: response.data.user.name,
              email: response.data.user.email,
              birthday: response.data.user.birthday,
              newsletter_confirmed: response.data.user.newsletter_confirmed as 0 | 1, // Ensure the type is correct
            });
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