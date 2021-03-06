import React, { useEffect, useState } from "react";
import {
  AuthPageContainerTypes,
  LoginFormTypes,
  RegisterFormTypes,
} from "./types";
import { LoginContainer } from "./components/LoginContainer";
import { RegisterContainer } from "./components/RegisterContainer";
import { useDispatch, useSelector } from "react-redux";
import {login, logout, register} from "../../store/actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";
import "./AuthPage.scss";
import moment from 'moment';


export const AuthPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();

  const [currentContainer, setCurrentContainer] = useState<AuthPageContainerTypes>(AuthPageContainerTypes.Login);
  const error = useSelector((state: any) => state.authReducer.error);

  useEffect(() => {
    if (location.state) {
      setCurrentContainer(location.state.option);
    }
  }, [location]);

  const handleSubmit = (values: LoginFormTypes) => {
    dispatch(login(values));
    !error && navigate("/timeline");
  };

  const HandleSubmit = (values: RegisterFormTypes) => {

    const value = {
      ...values,
      'date_of_birth': moment(values.date_of_birth).format('YYYY-MM-DD'),
    }
    // @ts-ignore
    delete value['confirm']
    dispatch(register(value));
    !error && navigate("/timeline");

  };

  return (
    <div className={"auth-page"}>
      <h1 className="auth-page__container__title">
        {currentContainer === AuthPageContainerTypes.Login
          ? "Войти"
          : "Зарегистрироваться"}
      </h1>
      <div className="auth-page__container">
        {currentContainer === AuthPageContainerTypes.Login ? (
          <LoginContainer
            onSubmit={handleSubmit}
            onChangePage={(path) => setCurrentContainer(path)}
          />
        ) : (
          <RegisterContainer
              onSubmit={HandleSubmit}
              // onChangePage={(path) => setCurrentContainer(path)}
          />
        )}
      </div>
    </div>
  );
};
