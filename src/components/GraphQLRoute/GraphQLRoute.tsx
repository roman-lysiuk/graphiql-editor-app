import React, { useState } from 'react';
import { Button } from '@mui/material';
import cl from './graphQLRoute.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearData, changeRoute, changeVariables } from '../../store/graphQLSlice';
import { setIsDrawerVisible } from '../../store/docPanelSlice';

export default function GraphQLRoute() {
  const { url } = useAppSelector((state) => state.graphQL);
  const { queryName, mutationName } = useAppSelector((state) => state.docPanel);
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
      <button onClick={handlerChangeRoute}>Change Route</button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(setIsDrawerVisible(true))}
        disabled={!mutationName && !queryName}
      >
        Open Docs
      </Button>
    </div>
  );
}
