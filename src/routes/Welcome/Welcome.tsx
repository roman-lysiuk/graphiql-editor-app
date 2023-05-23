import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';

export default function WelcomePage() {
  const theme = useAppSelector((state) => state.theme);
  const getDictVal = useDict();

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
              backgroundSize: 'cover',
            }
      }
    >
      <div className="welcome" style={theme.isDarkMode ? { textShadow: '0 0 5px black' } : {}}>
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>{getDictVal('playgroundText')}</h3>
        <p>{getDictVal('projectText')}</p>
        <p>{getDictVal('developers')}:</p>
        <div className="devs">
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/Folganoid/"
          >
            {getDictVal('andriiholubkov')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/gekalo1025/"
          >
            {getDictVal('romanlysiuk')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/sedric14/"
          >
            {getDictVal('olehsadrytskyi')}
          </a>
        </div>
      </div>
    </main>
  );
}
