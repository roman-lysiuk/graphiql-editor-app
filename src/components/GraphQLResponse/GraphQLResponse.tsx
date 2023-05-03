import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import cl from './graphQLResponse.module.scss';
import { useAppSelector } from '../../hooks/redux';
import normalizeData from '../../helpers/normalizeData';

export default function GraphQLResponse() {
  const { error, data, isLoading } = useAppSelector((state) => state.graphQL);
  return (
    <>
      {isLoading && <div>Loading...</div>}

      <section className={cl.response}>
        <MonacoEditor
          value={error || normalizeData(data)}
          width="100%"
          theme="vs-dark"
          height="80vh"
          language="json"
          options={{
            readOnly: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            lineNumbers: 'off',
          }}
        />
      </section>
    </>
  );
}
