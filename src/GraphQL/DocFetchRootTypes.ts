export interface IRootJson {
  data: {
    __schema: IRootJsonSchema;
  };
}

export interface IRootJsonSchema {
  mutationType: {
    name: string;
  } | null;
  queryType: {
    name: string;
  } | null;
}
const DocFetchRootTypes = (url: string) => {
  const body = JSON.stringify({
    query: `
      {
        __schema {
          mutationType {
            name
            fields {
              name
              description
            }
          }
          queryType {
            name
            fields {
              name
              description
            }
          }
        }
      }`,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export default DocFetchRootTypes;
