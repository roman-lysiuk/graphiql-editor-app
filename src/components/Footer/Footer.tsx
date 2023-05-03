import React from 'react';
import cl from './Footer.module.scss';
import gitLogo from '@/assets/images/git.svg';
import rsLogo from '@/assets/images/rs.svg';

export default function Footer() {
  return (
    <footer className={cl.footer}>
      <a className={cl.footer__link} href="https://github.com/sedric14/">
        <img className={cl.footer__logo} src={gitLogo} alt="gitHub logo" />
      </a>
      <a className={cl.footer__link} href="https://github.com/gekalo1025/">
        <img className={cl.footer__logo} src={gitLogo} alt="gitHub logo" />
      </a>
      <a className={cl.footer__link} href="https://github.com/Folganoid/">
        <img className={cl.footer__logo} src={gitLogo} alt="gitHub logo" />
      </a>
      2023 &copy;
      <a className={cl.footer__link} href="https://rs.school/">
        <img className={cl.footer__logo} src={rsLogo} alt="RSSchool logo" />
      </a>
    </footer>
  );
}
