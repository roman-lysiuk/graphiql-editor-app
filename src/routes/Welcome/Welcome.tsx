import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};
  const getDictVal = useDict();

  return (
    <main className="welcomeWrapper">
      <NavLink to="/sign">
        <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
          {user.id ? getDictVal('main') : getDictVal('signin')}
        </Button>
      </NavLink>
      <div className="welcome">
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>{getDictVal('playgroundText')}</h3>
        <p>{getDictVal('projectText')}</p>
        <p>{getDictVal('developers')}:</p>
        <div className="devs">
          <a className="GitLink" href="https://github.com/Folganoid/">
            {getDictVal('andriiholubkov')}
          </a>
          <a className="GitLink" href="https://github.com/gekalo1025/">
            {getDictVal('romanlysiuk')}
          </a>
          <a className="GitLink" href="https://github.com/sedric14/">
            {getDictVal('olehsadrytskyi')}
          </a>
        </div>
      </div>
    </main>
  );
}
