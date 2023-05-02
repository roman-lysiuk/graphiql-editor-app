import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGraphQL {
  url: string;
  variables: string;
  headers: string;
  data: JSON | null;
}

const initialState: IGraphQL = {
  url: import.meta.env.VITE_API_DEFAULT_GRAPHQL,
  variables: JSON.stringify({ page: 2, name: 'rick' }),
  headers: JSON.stringify({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),

  data: null,
};

const graphQLSlice = createSlice({
  name: 'graphQL',
  initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      /* eslint no-param-reassign: "error" */
      state.url = action.payload;
    },
    changeVariables(state, action: PayloadAction<string>) {
      /* eslint no-param-reassign: "error" */
      state.variables = action.payload;
    },
    changeHeaders(state, action: PayloadAction<string>) {
      /* eslint no-param-reassign: "error" */
      state.headers = action.payload;
    },
    changeData(state, action: PayloadAction<JSON | null>) {
      /* eslint no-param-reassign: "error" */
      state.data = action.payload;
    },
  },
});

export const { changeRoute, changeVariables, changeData, changeHeaders } = graphQLSlice.actions;
export default graphQLSlice.reducer;
