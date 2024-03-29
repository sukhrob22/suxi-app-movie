import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { auth } from "src/firebase";
import { useAuth } from "src/hooks/useAuth";


interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: '',
  isLoading: false,
  signIn: async () => { },
  signUp: async () => { },
  logout: async () => { }
})

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, user, signIn, signUp, logout, setUser, setIsLoading } = useAuth()
  const [initialLoader, setInitialLoader] = useState<boolean>(true)
  const router = useRouter()

  const value = useMemo(
    () => ({
      user, error, isLoading, logout, signIn, signUp, setIsLoading
    }),

    //eslint-disable-next-line
    [user, isLoading, error]
  )

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      // Ro'yhatdan o'tgan bo'lsa
      setIsLoading(false)
      setUser(user)
    } else {
      // Ro'yhatdan o'tmagan bo'lsa
      setUser(null)
      setIsLoading(true)
      router.push('/auth')
    }

    setIsLoading(false)
    setInitialLoader(false)
    //eslint-disable-next-line
  }), [])

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : "Loading..."}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider