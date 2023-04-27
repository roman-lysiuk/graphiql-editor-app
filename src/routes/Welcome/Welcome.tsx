import Button from '@mui/material/Button';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};

  return (
    <main className="welcomeWrapper">
      <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
        {user.id ? 'Sign In' : 'Sign Up'}
      </Button>
      <div className="welcome">
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>Playground for graphQL requests</h3>
        <p>This project was created as the final task of the RSSchool React</p>
        <p>Developers:</p>
        <div className="devs">
          <div className="GitLink">Andrii Holubkov</div>
          <div className="GitLink">Roman Lysiuk</div>
          <div className="GitLink">Oleh Sadrytskyi</div>
        </div>
      </div>
    </main>
  );
}
