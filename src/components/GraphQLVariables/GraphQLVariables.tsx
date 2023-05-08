import React from 'react';
import { EditorView } from 'codemirror';
import cl from './graphQLVariables.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeVariables } from '../../store/graphQLSlice';
import Codemirror from '../CodeMirror/Codemirror';

const fixedHeightEditor = EditorView.theme({
  '&': { height: '10vh' },
  '.cm-scroller': { overflow: 'auto' },
});

export default function GraphQLVariables() {
  const { variables } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();

  const handlerClick = (value: string | undefined) => {
    if (value) {
      dispatch(changeVariables(value));
    }
  };
  return (
    <section className={cl.variables}>
      <h5 className={cl.variables__btn}>Query Variables</h5>
      <Codemirror
        editor={false}
        onChange={handlerClick}
        value={variables}
        extensions={[fixedHeightEditor]}
      />
    </section>
  );
}
