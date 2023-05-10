import React from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useAppSelector } from '../../hooks/redux';
import normalizeData from '../../helpers/normalizeData';
import Codemirror from '../CodeMirror/Codemirror';
import Spinner from '../Spinner/Spinner';

export default function GraphQLResponse() {
  const { error, data, isLoading } = useAppSelector((state) => state.graphQL);

  return (
    <>
      {isLoading && <Spinner />}
      <section className="response">
        <Codemirror
          editor={false}
          onChange={() => {}}
          value={error ? normalizeData(error) : normalizeData(data)}
          extensions={[
            EditorState.readOnly.of(true),
            EditorView.theme({
              '&': { height: '78vh' },
              '.cm-scroller': { overflow: 'auto' },
              '.cm-gutters': { display: 'none' },
            }),
          ]}
        />
      </section>
    </>
  );
}
