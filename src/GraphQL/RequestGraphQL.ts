interface ISendQueryRequestGraphQLProps {
  url: string;
  queryRequest: string;
  variables?: { [key: string]: string | number };
  headers?: { [key: string]: string };
}
export default async function sendQueryRequestGraphQL(props: ISendQueryRequestGraphQLProps) {
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

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
