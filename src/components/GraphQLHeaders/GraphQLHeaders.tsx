import React, { useState } from 'react';
import VariablesEditor from '@monaco-editor/react';
import cl from './GraphQLHeaders.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeHeaders } from '../../store/graphQLSlice';

export default function GraphQLHeaders() {
  const { headers } = useAppSelector((state) => state.graphQL);
  const [isOpenHeaders, setIsOpenHeaders] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function toggleOpenHeaders() {
    setIsOpenHeaders((prev) => !prev);
  }
  return (
    <section className={cl.headers}>
      <button onClick={toggleOpenHeaders} className={cl.headers__btn}>
        Headers
      </button>
      <VariablesEditor
        value={headers}
        width="100%"
        options={{ formatOnPaste: true, formatOnType: true, fontSize: 20, padding: { top: 35 } }}
        height={isOpenHeaders ? '12vh' : '12vh'}
        theme="vs-dark"
        language="graphql"
        onChange={(value) => {
          if (value) {
            dispatch(changeHeaders(value));
          }
        }}
      />
    </section>
  );
}
