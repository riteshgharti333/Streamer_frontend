import { useState } from "react";
import UserContext from "./UserContext";


 const UserContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  
  return (
    <UserContext.Provider
    value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      loading,
      setLoading
    }}
    >
      {children}
    </UserContext.Provider>
  )

}


export default UserContextProvider;