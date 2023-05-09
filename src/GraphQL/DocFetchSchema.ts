export interface IFieldEntity {
  name: string | null;
  description: string | null;
  type: {
    name: string | null;
    kind: string;
  };
}

export interface ISchemaJson {
  data: {
    __type: {
      name: string;
      fields: IFieldEntity[];
    };
  };
}

export interface IField {
  name: string | null;
  description: string | null;
  model: string | null;
  type: string | null;
}

const DocFetchSchema = (url: string, name: string) => {
  const body = JSON.stringify({
    query: `
    {
      __type(name: "${name}") {
        name
        fields {
          name
          description
          type {
            name
            kind
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

export default DocFetchSchema;

export function schemaParser(fields: IFieldEntity[]): IField[] {
  if (fields.length) {
    const arr: IField[] = [];
    for (let i = 0; i < fields.length; i += 1) {
      arr.push({
        name: fields[i].name,
        description: fields[i].description,
        model: fields[i].type.name,
        type: fields[i].type.kind,
      });
    }
    return arr;
  }
  return [];
}
