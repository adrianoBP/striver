import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { auth, signInWithGoogle } from '../../services/firebase';

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = () => signInWithGoogle();

  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [setCurrentUser, setLoading]);

  const value = useMemo(
    () => ({
      currentUser,
      login,
      signup,
      logout,
    }),
    [currentUser, login, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {/* Loading is user state is changing */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default { AuthProvider, useAuth };
