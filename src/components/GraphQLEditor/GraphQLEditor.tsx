import { DocumentNode, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import validateGraphQLRequest from '../../helpers/validateGraphQLRequest';
import cl from './graphQLEditor.module.scss';
import getSchema from '../../helpers/getSchema';
import { useAppSelector } from '../../hooks/redux';

interface GraphQLEditorProps {
  setValidRequest: (value: DocumentNode) => void;
}

export default function GraphQLEditor({ setValidRequest }: GraphQLEditorProps) {
  const { url: GraphQLRoute } = useAppSelector((state) => state.graphQLRoute);
  const [initialValue, setInitialValue] = useState(`query {
    countries {
      code,code,capital
    }
  }`);

  const [valueMonaco, setValueMonaco] = useState(initialValue);
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
    initializeSchema();
  }, [GraphQLRoute]);

  useEffect(() => {
    if (GraphQLRoute !== import.meta.env.VITE_API_DEFAULT_GRAPHQL) {
      setInitialValue(`
      {
        __schema {
          types {
            name
          }

        }
      }
    `);
    }
  }, [GraphQLRoute]);
  useEffect(() => {
    setValueMonaco(initialValue);
  }, [initialValue]);

  return (
    <section className={cl.editor} id="graphql-editor">
      <h4>GraphQLEditor</h4>

      <MonacoEditor
        value={valueMonaco}
        width="100%"
        height="50vh"
        theme="vs-dark"
        language="graphql"
        onChange={(value) => setValueMonaco(value)}
      />

      <button
        onClick={() => {
          if (validateGraphQLRequest(valueMonaco)) {
            setValidRequest(gql`
              ${valueMonaco}
            `);
          }
        }}
      >
        GetResponse
      </button>
    </section>
  );
}
