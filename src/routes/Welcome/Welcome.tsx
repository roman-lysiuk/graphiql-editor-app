import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import getDict from '../../data/dictionary';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};
  const { lang } = useAppSelector((state) => state.multiLang);
  const theme = useAppSelector((state) => state.theme);

  return (
    <main
      className="welcomeWrapper"
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
      <NavLink to="/sign">
        <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
          {user.id ? getDict(lang, 'main') : getDict(lang, 'signin')}
        </Button>
      </NavLink>
      <div className="welcome" style={theme.isDarkMode ? { textShadow: '0 0 5px black' } : {}}>
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>{getDict(lang, 'playgroundText')}</h3>
        <p>{getDict(lang, 'projectText')}</p>
        <p>{getDict(lang, 'developers')}:</p>
        <div className="devs">
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/Folganoid/"
          >
            {getDict(lang, 'andriiholubkov')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/gekalo1025/"
          >
            {getDict(lang, 'romanlysiuk')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/sedric14/"
          >
            {getDict(lang, 'olehsadrytskyi')}
          </a>
        </div>
      </div>
    </main>
  );
}
