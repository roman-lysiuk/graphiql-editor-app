interface IDictionary {
  [index: string]: {
    [index: string]: string;
  };
}

const dictionary: IDictionary = {
  EN: {
    // Header
    menu: 'Menu',
    about: 'About',

    // Footer
    authors: 'Authors',
    dark: 'Dark',
    light: 'Light',

    // welcome page
    signin: 'SIGN IN',
    main: 'MAIN',
    developers: 'Developers',
    andriiholubkov: 'Andrii Holubkov',
    romanlysiuk: 'Roman Lysiuk',
    olehsadrytskyi: 'Oleh Sadrytskyi',
    playgroundText: 'Playground for graphQL requests',
    projectText: 'This project was created as the final task of the RSSchool React',

    // 404
    error404: 'page not found...',

    // sign page
    signup: 'SIGN UP',
    signup2: 'Sign up',
    signin2: 'Sign in',
    email: 'Email',
    password: 'Password',
    send: 'SEND',
    enterEmail: 'Please enter your Email',
    correctEmail: 'Please enter correct Email',
    enterPassword: 'Please enter your Password',
    correctPassword: 'Please enter correct Password',
  },
  UA: {
    // header
    menu: 'Меню',
    about: 'Опис',

    // Footer
    authors: 'Автори',
    dark: 'Темна',
    light: 'Свiтла',

    // welcome page
    signin: 'УВIЙТИ',
    main: 'ГОЛОВНА',
    developers: 'Розробники',
    andriiholubkov: 'Андрiй Голубков',
    romanlysiuk: 'Роман Лисюк',
    olehsadrytskyi: 'Oлeг Садрицький',
    playgroundText: 'Майданчик для запитів graphQL',
    projectText: 'Цей проект був створений як фінальне завдання RSSchool React',

    // 404
    error404: 'сторiнка не знайдена...',

    // sign page
    signup: 'ЗАРЕЄСТРУВАТИСЬ',
    signup2: 'Зареєструватися',
    signin2: 'Увiйти',
    email: 'Пошта',
    password: 'Пароль',
    send: 'НАДIСЛАТИ',
    enterEmail: 'Будь ласка, введіть Email',
    correctEmail: 'Будь ласка, введіть валiдний Email',
    enterPassword: 'Будь ласка, введіть свій пароль',
    correctPassword: 'Будь ласка, введіть валiдний пароль',
  },
};

export default dictionary;
