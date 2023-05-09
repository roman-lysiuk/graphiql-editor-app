import { Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import getSchema from '../helpers/getSchema';
import { addMessage } from '../store/sysMessengerSlice';

export default function useCodeMirror(extensions: Extension[], editor: boolean) {
  const { url } = useAppSelector((state) => state.graphQL);
  const [element, setElement] = useState<HTMLElement>();
  const [view, setView] = useState<EditorView>();
  const [schema, setSchema] = useState<GraphQLSchema>();
  const dispatch = useAppDispatch();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  useEffect(() => {
    async function initializationSchema() {
      try {
        const currentSchema = await getSchema(url);
        if (currentSchema instanceof GraphQLSchema) {
          setSchema(currentSchema);
        } else if (currentSchema instanceof Error) {
          dispatch(addMessage({ type: 'error', message: 'Schema loading error' }));
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(addMessage({ type: 'error', message: err.message }));
        }
      }
    }
    if (editor) {
      initializationSchema();
    }
  }, [url, dispatch, editor]);

  useEffect(() => {
    if (!element) return;
    const viewEditor = new EditorView({
      extensions: editor
        ? [basicSetup, graphql(schema), ...extensions]
        : [basicSetup, ...extensions],
      parent: element,
    });
    setView(viewEditor);
    // eslint-disable-next-line consistent-return
    return () => {
      viewEditor.destroy();
      setView(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, schema]);

  return { ref, view };
}
