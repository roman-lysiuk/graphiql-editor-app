import { createAsyncThunk } from '@reduxjs/toolkit';

interface ISendQueryRequestGraphQLProps {
  url: string;
  queryRequest: string;
  variables?: { [key: string]: string | number };
  headers?: { [key: string]: string };
}
const sendQueryRequestGraphQL = createAsyncThunk(
  'sendReqGraphQL',
  async (props: ISendQueryRequestGraphQLProps, { rejectWithValue }) => {
    const { url, queryRequest, variables, headers } = props;

    const graphqlQuery = {
      query: queryRequest,
      variables,
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(graphqlQuery),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export default sendQueryRequestGraphQL;
