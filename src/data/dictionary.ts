import { Langs } from '../store/multiLangSlice';

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
    signin: 'ВХIД',
    main: 'ГОЛОВНА',
    developers: 'Розробники',
    andriiholubkov: 'Андрiй Голубков',
    romanlysiuk: 'Роман Lисюк',
    olehsadrytskyi: 'Oleг Садрицький',
    playgroundText: 'Майданчик для запитів graphQL',
    projectText: 'Цей проект був створений як фінальне завдання RSSchool React',

    // 404
    error404: 'сторiнка не знайдена...',
  },
};

export default function getDict(lang: Langs, name: string): string {
  let res = '???';
  if (lang in dictionary && name in dictionary[lang]) res = dictionary[lang][name];
  return res;
}
