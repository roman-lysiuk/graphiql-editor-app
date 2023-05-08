import React, { useState } from 'react';
import cl from './graphQLRoute.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearData, changeRoute, changeVariables } from '../../store/graphQLSlice';

export default function GraphQLRoute() {
  const { url } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();
  const [route, setRoute] = useState<string>(url);
  const theme = useAppSelector((state) => state.theme);

  const handlerChangeRoute = () => {
    dispatch(changeRoute(route));
    dispatch(clearData());
    dispatch(
      changeVariables(`{

}`),
    );
  };
  return (
    <div className={cl.routeRow}>
      <label className={cl.routeRow__label} htmlFor="route-graphql">
        Route:
        <input
          style={theme.isDarkMode ? { border: '3px solid white' } : {}}
          className={cl.routeRow__input}
          id="route-graphql"
          type="text"
          placeholder="Enter route graphQL"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </label>
      <button
        className={cl.routeRow__button}
        onClick={handlerChangeRoute}
        style={
          theme.isDarkMode
            ? { color: 'white', border: '3px solid white' }
            : { color: 'black', border: '3px solid black' }
        }
      >
        CHANGE ROUTE
      </button>
    </div>
  );
}
