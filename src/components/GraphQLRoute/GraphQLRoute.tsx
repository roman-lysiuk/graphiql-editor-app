import React, { useState } from 'react';
import cl from './graphQLRoute.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearData, changeRoute, changeVariables } from '../../store/graphQLSlice';

export default function GraphQLRoute() {
  const { url } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();
  const [route, setRoute] = useState<string>(url);

  function handlerChangeRoute() {
    dispatch(changeRoute(route));
    dispatch(clearData());
    dispatch(
      changeVariables(`{

}`),
    );
  }
  return (
    <div className={cl.routeRow}>
      <label className={cl.routeRow__label} htmlFor="route-graphql">
        Route:
        <input
          className={cl.routeRow__input}
          id="route-graphql"
          type="text"
          placeholder="Enter route graphQL"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </label>
      <button className={cl.routeRow__button} onClick={handlerChangeRoute}>
        Change Route
      </button>
    </div>
  );
}
