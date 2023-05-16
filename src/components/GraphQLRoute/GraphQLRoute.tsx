import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import cl from './graphQLRoute.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearData, changeRoute, changeVariables } from '../../store/graphQLSlice';
import { setIsDrawerVisible } from '../../store/docPanelSlice';
import useDict from '../../hooks/useDict';

export default function GraphQLRoute() {
  const { url } = useAppSelector((state) => state.graphQL);
  const { isLoading } = useAppSelector((state) => state.docPanel);
  const dispatch = useAppDispatch();
  const [route, setRoute] = useState<string>(url);
  const theme = useAppSelector((state) => state.theme);
  const getDictVal = useDict();

  const handlerChangeRoute = () => {
    dispatch(changeRoute(route));
    dispatch(clearData());
    dispatch(
      changeVariables(`{

}`),
    );
  };

  const spinnerBtn = (
    <Button
      className={cl.routeRow__button}
      disabled
      color="secondary"
      variant="contained"
      sx={{ width: '10rem' }}
      style={{ fontSize: '100%', opacity: '0.5' }}
    >
      <CircularProgress size={32} sx={{ color: 'rgb(255,255,255)' }} />
    </Button>
  );

  const okBtn = (
    <Button
      className={cl.routeRow__button}
      variant="contained"
      color="secondary"
      onClick={() => dispatch(setIsDrawerVisible(true))}
      sx={{ width: '10rem' }}
      style={{ fontSize: '100%' }}
    >
      {getDictVal('docs')}
    </Button>
  );

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
      <Button
        className={cl.routeRow__button}
        onClick={handlerChangeRoute}
        style={{ fontSize: '100%' }}
      >
        CHANGE ROUTE
      </Button>
      {isLoading ? spinnerBtn : okBtn}
    </div>
  );
}
