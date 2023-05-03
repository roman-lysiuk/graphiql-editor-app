import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import getDict from '../../data/dictionary';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};
  const { lang } = useAppSelector((state) => state.multiLang);

  return (
    <main className="welcomeWrapper">
      <NavLink to="/sign">
        <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
          {user.id ? getDict(lang, 'main') : getDict(lang, 'signin')}
        </Button>
      </NavLink>
      <div className="welcome">
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>{getDict(lang, 'playgroundText')}</h3>
        <p>{getDict(lang, 'projectText')}</p>
        <p>{getDict(lang, 'developers')}:</p>
        <div className="devs">
          <a className="GitLink" href="https://github.com/Folganoid/">
            {getDict(lang, 'andriiholubkov')}
          </a>
          <a className="GitLink" href="https://github.com/gekalo1025/">
            {getDict(lang, 'romanlysiuk')}
          </a>
          <a className="GitLink" href="https://github.com/sedric14/">
            {getDict(lang, 'olehsadrytskyi')}
          </a>
        </div>
      </div>
    </main>
  );
}
