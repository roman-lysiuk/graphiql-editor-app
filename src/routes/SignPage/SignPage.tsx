/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input, InputBase } from '@mui/material';
import { Sign } from '../../interfaces';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUser } from '../../store/userSlice';

const SignPage: React.FC = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Sign>();

  function onSubmit(data: Sign) {
    if (isUser) {
      logInWithEmailAndPassword(data.email, data.password).then((user) => {
        dispatch(setUser(user));
        console.log(user);
        if (user.token) navigate('/main');
      });
    } else {
      registerWithEmailAndPassword(data.email, data.password).then((user) => {
        dispatch(setUser(user));
        console.log(user);
        if (user.token) navigate('/main');
      });
    }
    reset();
  }
  function googleAuth() {
    signInWithGoogle();
  }
  const toggleLink = () => (isUser ? setIsUser(false) : setIsUser(true));
  return (
    <div
      className="formPage"
      style={
        theme.isDarkMode
          ? {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/back_GraphQL.jpg")',
            }
          : {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/wall-light.jpeg")',
            }
      }
    >
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        style={
          theme.isDarkMode
            ? {}
            : {
                border: '3px solid #1c1c1c',
                backgroundColor: '#0000004d',
                textShadow: '0 0 5px white',
                fontWeight: '800',
              }
        }
      >
        <h2 className="formHead" style={theme.isDarkMode ? {} : { fontWeight: 600 }}>
          {isUser ? 'SIGN IN' : 'SIGN UP'}
        </h2>
        <label className="label">
          Email:
          <InputBase
            className="input"
            type="text"
            {...register('email', {
              required: {
                value: true,
                message: 'Please enter your Email',
              },
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Please enter correct Email',
              },
            })}
          />
        </label>
        <p className={`form-control ${errors.email ? 'errDis' : 'errMess'}`}>
          {errors.email?.message}
        </p>
        <label className="label">
          Password:
          <InputBase
            className="input"
            type="text"
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter your Password',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})/g,
                message: 'Please enter correct Password',
              },
            })}
          />
        </label>
        <p className={`form-control ${errors.password ? 'errDis' : 'errMess'}`}>
          {errors.password?.message}
        </p>
        <button className="googleBtn" onClick={googleAuth} />
        <Input className="submit" type="submit" value="SEND" />
        <p
          className={theme.isDarkMode ? 'upLink' : 'linkLight'}
          onClick={() => {
            toggleLink();
          }}
        >
          {isUser ? 'Sign up' : 'Sign in'}
        </p>
      </form>
    </div>
  );
};

export default SignPage;
