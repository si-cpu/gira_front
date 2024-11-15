import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부
  onLogin: () => {},
  onLogout: () => {},
  userRole: "",
  isInit: false,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("USER_ROLE"));
    }
    setIsInit(true);
  }, []);

  // 로그인 핸들러
  const loginHandler = (token, id, role) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("USER_ID", id);
    localStorage.setItem("USER_ROLE", role);

    setIsLoggedIn(true);
    setUserRole(role);
  };

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole("");
  };

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("USER_ROLE"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        userRole,
        isInit,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
