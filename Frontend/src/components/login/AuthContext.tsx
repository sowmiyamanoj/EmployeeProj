import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useHistory

interface AuthContextProps {
  isLoggedIn: boolean | null;
  employeeID: string | null;
  roleName: string | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [roleName, setRoleName] = useState<string | null>(null);

  const navigate = useNavigate();

useEffect(() => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      setEmployeeID(decodedToken.employeeID);
      setRoleName(decodedToken.roleName);
      setIsLoggedIn(true);

      // Calculate expiration time in milliseconds
      const expirationTimeInHours = 1;
      const expirationInMilliseconds = expirationTimeInHours * 60 * 60 * 1000;

      // Set a timeout to automatically log out after the specified expiration time
      setTimeout(() => {
        logout();
      }, expirationInMilliseconds);
    } catch (error) {
      console.error('Error decoding token:', error);
      logout();
    }
  } else {
    setIsLoggedIn(false);
  }
}, []);

const login = (token: string) => {
  const expirationTimeInHours = 1;
  const expirationInMinutes = expirationTimeInHours * 60;

  Cookies.set('token', token, { expires: expirationInMinutes });

  try {
    const decodedToken: any = jwtDecode(token);
    setEmployeeID(decodedToken.employeeID);
    setRoleName(decodedToken.roleName);
    setIsLoggedIn(true);

    // Calculate expiration time in milliseconds
    const expirationInMilliseconds = expirationInMinutes * 60 * 1000;

    // Set a timeout to automatically log out after the specified expiration time
    setTimeout(() => {
      logout();
    }, expirationInMilliseconds);
  } catch (error) {
    console.error('Error decoding token:', error);
    logout();
  }
};

  const logout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setEmployeeID(null);
    setRoleName(null);
    navigate('/'); // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, roleName, employeeID, token: Cookies.get('token') || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
