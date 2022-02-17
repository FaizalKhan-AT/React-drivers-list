import { createContext, useState, useEffect } from "react";
export const EditDriver = createContext();
export const Auth = createContext();
function Contexts({ children }) {
  const [driverDetails, setDriverDetails] = useState({});
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <Auth.Provider value={{ token, setToken }}>
      <EditDriver.Provider value={{ driverDetails, setDriverDetails }}>
        {children}
      </EditDriver.Provider>
    </Auth.Provider>
  );
}

export default Contexts;
