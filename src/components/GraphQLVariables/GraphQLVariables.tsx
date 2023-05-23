import React, { useState } from 'react';
import { EditorView } from 'codemirror';
import { linter } from '@codemirror/lint';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeVariables } from '../../store/graphQLSlice';
import Codemirror from '../CodeMirror/Codemirror';
import cl from './graphQLVariables.module.scss';

const fixedHeightEditor = EditorView.theme({
  '&': { height: '10vh' },
  '.cm-scroller': { overflow: 'auto' },
});
const linterExtension = linter(jsonParseLinter());

export default function GraphQLVariables() {
  const [hide, setHide] = useState(false);
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.graphQL);
  const handlerClick = (value: string | undefined) => {
    if (value) {
      dispatch(changeVariables(value));
    }
  };

  function click() {
    setHide(!hide);
  }

  return (
    <section className={cl.variables}>
      <div className={cl.variables__headWrap}>
        <h5 className={cl.variables__header}>Query Variables</h5>
        <button className={cl.variables__btn} onClick={click}>
          {hide ? '▲' : '▼'}
        </button>
      </div>
      {!hide ? (
        <div />
      ) : (
        <Codemirror
          editor={false}
          onChange={handlerClick}
          value={variables}
          extensions={[
            fixedHeightEditor,
            json(),
            jsonLanguage,
            linterExtension,
            javascript({ jsx: true }),
            darcula,
          ]}
        />
      )}
    </section>
  );
}
