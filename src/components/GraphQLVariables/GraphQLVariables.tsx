import React, { useState } from 'react';
import VariablesEditor from '@monaco-editor/react';
import cl from './graphQLVariables.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeVariables } from '../../store/graphQLSlice';

export default function GraphQLVariables() {
  const { variables } = useAppSelector((state) => state.graphQL);
  const [isOpenVariables, setIsOpenVariables] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function toggleOpenVariables() {
    setIsOpenVariables((prev) => !prev);
  }
  return (
    <section className={cl.variables}>
      <button onClick={toggleOpenVariables} className={cl.variables__btn}>
        Query Variables
      </button>
      <VariablesEditor
        value={variables}
        width="100%"
        height={isOpenVariables ? '20vh' : '0'}
        theme="vs-dark"
        language="graphql"
        onChange={(value) => {
          if (value) {
            dispatch(changeVariables(value));
          }
        }}
      />
    </section>
  );
}
