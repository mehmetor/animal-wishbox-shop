"use client";

import { useState } from "react";

import Register from "@modules/account/components/register";
import Login from "@modules/account/components/login";
import ResetPassword from "@modules/account/components/reset-password";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  RESET_PASSWORD = "reset-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in");

  const handleViewChange = (view: LOGIN_VIEW) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <div className="flex w-full justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={handleViewChange} />
      ) : currentView === "register" ? (
        <Register setCurrentView={handleViewChange} />
      ) : (
        <ResetPassword setCurrentView={handleViewChange} />
      )}
    </div>
  );
};

export default LoginTemplate;
