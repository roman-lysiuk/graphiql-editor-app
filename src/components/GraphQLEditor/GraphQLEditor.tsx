import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import validateGraphQLRequest from '../../helpers/validateGraphQLRequest';
import cl from './graphQLEditor.module.scss';
import getSchema from '../../helpers/getSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GraphQLVariables from '../GraphQLVariables/GraphQLVariables';
import sendQueryRequestGraphQL from '../../GraphQL/RequestGraphQL';
import GraphQLHeaders from '../GraphQLHeaders/GraphQLHeaders';
import { changeErrors } from '../../store/graphQLSlice';

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
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { url: GraphQLRoute, variables, headers } = useAppSelector((state) => state.graphQL);
  const [validRequest, setValidRequest] = useState<string>(initialValueGraphQL);
  const [valueMonaco, setValueMonaco] = useState<string | undefined>(initialValueGraphQL);
  const dispatch = useAppDispatch();

  const handlerChangeEditor = (value: string | undefined) => {
    setValueMonaco(value);
    if (validateGraphQLRequest(valueMonaco)) {
      setValidRequest(`
        ${valueMonaco}
      `);
    } else {
      dispatch(changeErrors('Error in graphQL query'));
    }
  };

  const handlerGetResponseBtn = () => {
    if (validRequest !== '') {
      dispatch(
        sendQueryRequestGraphQL({
          url: GraphQLRoute,
          queryRequest: validRequest,
          variables: JSON.parse(variables),
          headers: JSON.parse(headers),
        }),
      );
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

  return (
    <section className={cl.editor} id="graphql-editor">
      <MonacoEditor
        className={cl.editor__edit}
        value={valueMonaco}
        width="100%"
        height="52vh"
        theme={isDarkMode ? 'vs-dark' : 'vs-lights'}
        language="graphql"
        options={{
          tabCompletion: 'on',
          fontSize: 20,
          scrollbar: {
            vertical: 'hidden',
          },
        }}
        onChange={handlerChangeEditor}
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
