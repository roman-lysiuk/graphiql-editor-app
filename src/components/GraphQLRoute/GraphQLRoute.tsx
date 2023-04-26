import React, { useState } from 'react';
import cl from './graphQLRoute.module.scss';

const defaultRoute: string = import.meta.env.VITE_API_DEFAULT_GRAPHQL;

export default function GraphQLRoute() {
  const [route, setRoute] = useState<string>(defaultRoute);
  return (
    <div className={cl.routeRow}>
      <label htmlFor="route-graphql">
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
      <button>Change Route</button>
    </div>
  );
}
