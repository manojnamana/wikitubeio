// import axios from 'axios';
// import { useState, createContext, ReactNode, FC } from 'react';
// import { useRouter } from 'next/router';

// interface AuthContextType {
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
//   updated: boolean | null;
//   uploaded: boolean | null;
//   login: (credentials: { username: string; password: string }) => Promise<void>;
//   register: (data: {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     gender: string;
//     email: string;
//     password: string;
//   }) => Promise<void>;
//   updateProfile: (data: {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     gender: string;
//     email: string;
//     password: string;
//   }, access_token: string) => Promise<void>;
//   logout: () => Promise<void>;
//   setUpdated: (value: boolean | null) => void;
//   setUploaded: (value: boolean | null) => void;
//   uploadResume: (formData: FormData, access_token: string) => Promise<void>;
//   clearErrors: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [waiting, setWaiting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [updated, setUpdated] = useState<boolean | null>(null);
//   const [uploaded, setUploaded] = useState<boolean | null>(null);

//   const router = useRouter();

//   const login = async ({ username, password }: { username: string; password: string }): Promise<void> => {
//     try {
//       setWaiting(true);
//       const res = await axios.post('/api/auth/login', { username, password });
//       if (res.data.success) {
//         setIsAuthenticated(true);
//         router.push('/directory');
//       }
//     } catch (error: any) {
//       setError(error.response?.data.detail || error.response?.data.error || 'An error occurred');
//     } finally {
//       setWaiting(false);
//     }
//   };

//   const register = async (data: {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     gender: string;
//     email: string;
//     password: string;
//   }) => {
//     // Implementation
//   };

//   const updateProfile = async (data: {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     gender: string;
//     email: string;
//     password: string;
//   }, access_token: string) => {
//     // Implementation
//   };

//   const logout = async () => {
//     // Implementation
//   };

//   const uploadResume = async (formData: FormData, access_token: string) => {
//     // Implementation
//   };

//   const clearErrors = () => {
//     setError(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//      waiting,
//         error,
//         isAuthenticated,
//         login,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
