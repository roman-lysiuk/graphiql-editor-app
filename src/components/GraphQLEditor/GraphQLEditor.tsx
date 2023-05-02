import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import validateGraphQLRequest from '../../helpers/validateGraphQLRequest';
import cl from './graphQLEditor.module.scss';
import getSchema from '../../helpers/getSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GraphQLVariables from '../GraphQLVariables/GraphQLVariables';
import sendQueryRequestGraphQL from '../../GraphQL/RequestGraphQL';
import { changeData } from '../../store/graphQLSlice';
import GraphQLHeaders from '../GraphQLHeaders/GraphQLHeaders';

const initialValueGraphQL = `query($page:Int,$name:String) {
  characters(page: $page, filter: { name: $name}) {
    info {
      count
    }
    results {
      name
    }
  }
}`;
const defaultInitialValueGraphQL = `query{
  __schema {
    types {
      name
    }

  }
}
`;

export default function GraphQLEditor() {
  const { url: GraphQLRoute, variables, headers } = useAppSelector((state) => state.graphQL);
  const [validRequest, setValidRequest] = useState<string>('');
  const [valueMonaco, setValueMonaco] = useState<string | undefined>(initialValueGraphQL);
  const dispatch = useAppDispatch();

  const handlerGetResponseBtn = () => {
    if (validateGraphQLRequest(valueMonaco)) {
      setValidRequest(`
        ${valueMonaco}
      `);
    }
  };
  useEffect(() => {
    const initializeSchema = async () => {
      const currentSchema = await getSchema(GraphQLRoute);

      initializeMode({
        schemas: [
          {
            schema: currentSchema,
            uri: GraphQLRoute,
          },
        ],
      });
    };
    if (GraphQLRoute !== import.meta.env.VITE_API_DEFAULT_GRAPHQL) {
      setValueMonaco(defaultInitialValueGraphQL);
    }
    initializeSchema();
  }, [GraphQLRoute]);

  useEffect(() => {
    async function getData() {
      const data = await sendQueryRequestGraphQL({
        url: GraphQLRoute,
        queryRequest: validRequest,
        variables: JSON.parse(variables),
        headers: JSON.parse(headers),
      });
      dispatch(changeData(data));
    }
    if (validRequest !== '') {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validRequest, variables, headers]);

  return (
    <section className={cl.editor} id="graphql-editor">
      <MonacoEditor
        value={valueMonaco}
        width="100%"
        height="80vh"
        theme="vs-dark"
        language="graphql"
        options={{ tabCompletion: 'on' }}
        onChange={(value) => setValueMonaco(value)}
      />
      <button className={cl.editor__button} onClick={handlerGetResponseBtn}>
        GetResponse
      </button>
      <div className={cl.editor__settingRow}>
        <GraphQLVariables />
        <GraphQLHeaders />
      </div>
    </section>
  );
}
