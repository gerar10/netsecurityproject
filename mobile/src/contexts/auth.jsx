import React from 'react';

const AuthContext = React.createContext({
  authStatus: undefined,
  setAuthStatus: () => {}
});

export const useAuthStatus = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = React.useState(undefined);
  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;