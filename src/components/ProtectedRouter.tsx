import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";
import { useAuth } from "../hooks/useAuth";
import {
  setCurrentPathToLocalStorage,
  getCurrentPathToLocalStorage,
  getTokenFromLocalStorage,
} from "../helpers/localstorage.helper";
import { getMeHelper } from "../helpers/main.helper";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { getALLEmployeeHelper } from "../helpers/employee.helper";
import { authentificator } from "../store/auth2.store";
import Loader from "./Loader/Loader";
import LocalStorage from "../helpers/localstorage2.helper";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    authentificator.getMe()
    .then(content => {
      if (Object.keys({...content}).includes("id")) {
        setIsAuth(true)
        setCurrentUser({...content});
      }
      console.log(authentificator.isAuth())
      return content;
    })
    .then(content => console.log({...content}));
  }, [])

  return (
    <div>
      {
        authentificator.isAuth() ? children : <Navigate replace to="/auth"/>
      }
    </div>
  )
};

export default observer(ProtectedRouter);
