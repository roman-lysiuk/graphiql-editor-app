import React from 'react';
import { EditorView } from 'codemirror';
import { linter } from '@codemirror/lint';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeVariables } from '../../store/graphQLSlice';
import Codemirror from '../CodeMirror/Codemirror';
import cl from './graphQLVariables.module.scss';
import useDict from '../../hooks/useDict';

const fixedHeightEditor = EditorView.theme({
  '&': { height: '10vh' },
  '.cm-scroller': { overflow: 'auto' },
});
const linterExtension = linter(jsonParseLinter());

export default function GraphQLVariables() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.graphQL);
  const handlerClick = (value: string | undefined) => {
    if (value) {
      dispatch(changeVariables(value));
    }
  };

  return (
    <section className={cl.variables}>
      <h5 className={cl.variables__btn}>{getDictVal('titleQueryVariables')}</h5>
      <div className="wrapVar">
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
      </div>
    </section>
  );
}
