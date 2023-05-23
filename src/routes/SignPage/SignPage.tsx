/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@mui/material';
import { Sign } from '../../interfaces';
import { useLogInWithEmailAndPassword, useRegisterWithEmailAndPassword } from '../../firebase';
import { ValidationPassword, ValidateEmail } from './validate';
import { useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';
import InputForm from '../../components/InputForm/InputForm';
import Spinner from '../../components/Spinner/Spinner';

const SignPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const theme = useAppSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Sign>({ reValidateMode: 'onChange', mode: 'onChange' });

  const getDictVal = useDict();
  const { isProcess } = useAppSelector((state) => state.spinner);
  const [registration] = useRegisterWithEmailAndPassword();
  const [login] = useLogInWithEmailAndPassword();

  function onSubmit(data: Sign) {
    if (isSignIn) {
      login(data.email, data.password);
    } else {
      registration(data.email, data.password);
    }
    reset();
  }

  const toggleLink = () => (isSignIn ? setIsSignIn(false) : setIsSignIn(true));
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
              backgroundSize: 'cover',
            }
      }
    >
      {isProcess && <Spinner />}
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
          {isSignIn ? getDictVal('signin') : getDictVal('signup')}
        </h2>

        <InputForm
          labelName={getDictVal('email')}
          type="email"
          register={register}
          errors={errors}
          name="email"
          validation={ValidateEmail()}
        />
        <InputForm
          labelName={getDictVal('password')}
          type="password"
          register={register}
          errors={errors}
          name="password"
          validation={ValidationPassword()}
        />
        {!isSignIn && (
          <InputForm
            labelName={getDictVal('repeatPassword')}
            type="password"
            register={register}
            errors={errors}
            name="repeatPassword"
            validation={{
              required: { value: true, message: getDictVal('requiredField') },
              validate: (value: string) =>
                watch('password') === value || getDictVal('incorrectPassword'),
            }}
          />
        )}

        {/* <button className="googleBtn" onClick={googleAuth} /> */}

        <Input className="submit" type="submit" value={getDictVal('send')} />
        <p
          className={theme.isDarkMode ? 'upLink' : 'linkLight'}
          onClick={() => {
            toggleLink();
          }}
        >
          {isSignIn ? getDictVal('signup2') : getDictVal('signin2')}
        </p>
      </form>
    </div>
  );
};

export default SignPage;
