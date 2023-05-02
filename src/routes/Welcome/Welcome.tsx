import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};

  return (
    <main className="welcomeWrapper">
      <NavLink to={user.id ? '/main' : '/sign'}>
        <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
          {user.id ? 'MAIN' : 'SIGN IN'}
        </Button>
      </NavLink>
      <div className="welcome">
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>Playground for graphQL requests</h3>
        <p>This project was created as the final task of the RSSchool React</p>
        <p>Developers:</p>
        <div className="devs">
          <a className="GitLink" href="https://github.com/Folganoid/">
            Andrii Holubkov
          </a>
          <a className="GitLink" href="https://github.com/gekalo1025/">
            Roman Lysiuk
          </a>
          <a className="GitLink" href="https://github.com/sedric14/">
            Oleh Sadrytskyi
          </a>
        </div>
      </div>
    </main>
  );
}
