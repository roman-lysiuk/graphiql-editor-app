import { Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from './redux';
import getSchema from '../helpers/getSchema';

export default function useCodeMirror(extensions: Extension[], editor: boolean) {
  const { url } = useAppSelector((state) => state.graphQL);
  const [element, setElement] = useState<HTMLElement>();
  const [view, setView] = useState<EditorView>();
  const [schema, setSchema] = useState<GraphQLSchema>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  useEffect(() => {
    async function initializationSchema() {
      const currentSchema = await getSchema(url);
      setSchema(currentSchema);
    }
    initializationSchema();
  }, [url]);

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
