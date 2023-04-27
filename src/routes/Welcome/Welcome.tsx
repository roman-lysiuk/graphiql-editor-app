import React from 'react';

export default function About() {
  return (
    <main className="welcomeWrapper">
      <button className="signButton">Sign In</button>
      <div className="welcome">
        <h1>GraphiQL</h1>
        <h3>Playground for graphQL requests</h3>
        <p>This project was created as the final task of the RSSchool React</p>
        <p>Developers:</p>
        <div className="devs">
          <div>Andrii Holubkov</div>
          <div>Roman Lysiuk</div>
          <div>Oleh Sadrytskyi</div>
        </div>
      </div>
      <h1>About</h1>
    </main>
  );
}
