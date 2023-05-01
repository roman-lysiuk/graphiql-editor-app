import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGraphQLRoute {
  url: string;
}

const initialState: IGraphQLRoute = {
  url: import.meta.env.VITE_API_DEFAULT_GRAPHQL,
};

const graphQLRouteSlice = createSlice({
  name: 'graphQLRoute',
  initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      /* eslint no-param-reassign: "error" */
      state.url = action.payload;
    },
  },
});

export const { changeRoute } = graphQLRouteSlice.actions;
export default graphQLRouteSlice.reducer;
