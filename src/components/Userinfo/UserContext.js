import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부
  onLogin: () => {},
  onLogout: () => {},
  userRole: "",
  isInit: false,
  userEmail: "",
  userNickname: "",
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isInit, setIsInit] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(sessionStorage.getItem("USER_ROLE"));
    }
    setUserEmail(sessionStorage.getItem("User_Email"));
    setUserNickname(sessionStorage.getItem("Nickname_Email"));
    setIsInit(true);
  }, []);

  // 로그인 핸들러
  const loginHandler = (token, id, role, email, nickname) => {
    sessionStorage.setItem("ACCESS_TOKEN", token);
    sessionStorage.setItem("USER_ID", id);
    sessionStorage.setItem("USER_ROLE", role);
    sessionStorage.setItem("USER_EMAIL", email);
    sessionStorage.setItem("USER_NICKNAME", nickname);

    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
    setUserNickname(nickname);
  };

  // 로그아웃 핸들러
  const logoutHandler = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserRole("");
    setUserEmail("");
    setUserNickname("");
  };

  useEffect(() => {
    if (sessionStorage.getItem("ACCESS_TOKEN")) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("USER_ROLE"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        userNickname,
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
