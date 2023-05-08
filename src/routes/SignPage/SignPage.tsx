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
import { Sign } from '../../interfaces';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/userSlice';
import useDict from '../../hooks/useDict';

const SignPage: React.FC = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Sign>();

  const getDictVal = useDict();

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
    <div className="formPage">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formHead">{isUser ? getDictVal('signin') : getDictVal('signup')}</h2>
        <label className="label">
          {getDictVal('email')}:
          <input
            className="input"
            type="text"
            {...register('email', {
              required: {
                value: true,
                message: getDictVal('enterEmail'),
              },
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: getDictVal('correctEmail'),
              },
            })}
          />
        </label>
        <p className={`form-control ${errors.email ? 'errDis' : 'errMess'}`}>
          {errors.email?.message}
        </p>
        <label className="label">
          {getDictVal('password')}:
          <input
            className="input"
            type="text"
            {...register('password', {
              required: {
                value: true,
                message: getDictVal('enterPassword'),
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})/g,
                message: getDictVal('correctPassword'),
              },
            })}
          />
        </label>
        <p className={`form-control ${errors.password ? 'errDis' : 'errMess'}`}>
          {errors.password?.message}
        </p>
        <button className="googleBtn" onClick={googleAuth} />
        <input className="submit" type="submit" value={getDictVal('send')} />
        <p
          className="upLink"
          onClick={() => {
            toggleLink();
          }}
        >
          {isUser ? getDictVal('signup2') : getDictVal('signin2')}
        </p>
      </form>
    </div>
  );
};

export default SignPage;
