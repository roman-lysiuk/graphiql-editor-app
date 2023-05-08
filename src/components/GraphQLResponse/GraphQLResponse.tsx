import React from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useAppSelector } from '../../hooks/redux';
import normalizeData from '../../helpers/normalizeData';
import Codemirror from '../CodeMirror/Codemirror';

export default function GraphQLResponse() {
  const { error, data, isLoading } = useAppSelector((state) => state.graphQL);
  return (
    <>
      {isLoading && <div>Loading...</div>}

      <section className="response">
        <Codemirror
          editor={false}
          onChange={() => {}}
          value={error || normalizeData(data)}
          extensions={[
            EditorState.readOnly.of(true),
            EditorView.theme({
              '&': { height: '78vh' },
              '.cm-scroller': { overflow: 'auto' },
            }),
          ]}
        />
      </section>
    </>
  );
}
