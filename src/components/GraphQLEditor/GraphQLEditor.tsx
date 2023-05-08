import React, { useEffect, useState } from 'react';
import { EditorView } from 'codemirror';
import cl from './graphQLEditor.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GraphQLVariables from '../GraphQLVariables/GraphQLVariables';
import sendQueryRequestGraphQL from '../../GraphQL/RequestGraphQL';
import GraphQLHeaders from '../GraphQLHeaders/GraphQLHeaders';
import Codemirror from '../CodeMirror/Codemirror';

const initialValueGraphQL = `
#   Auto Complete:  Ctrl-Space (or just start typing)
query($page:Int,$name:String) {
  characters(page: $page, filter: { name: $name}) {
    info {
      count
    }
    results {
      name
    }
  }
}`;
const defaultInitialValueGraphQL = `#   Auto Complete:  Ctrl-Space (or just start typing)
query{
  __schema {
    types {
      name
    }

  }
}
`;
const fixedHeightEditor = EditorView.theme({
  '&': { height: '80vh' },
  '.cm-scroller': { overflow: 'auto' },
});

export default function GraphQLEditor() {
  const { url: GraphQLRoute, variables, headers } = useAppSelector((state) => state.graphQL);
  const [valueMonaco, setValueMonaco] = useState<string>(initialValueGraphQL);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (GraphQLRoute !== import.meta.env.VITE_API_DEFAULT_GRAPHQL) {
      setValueMonaco(defaultInitialValueGraphQL);
    }
  }, [GraphQLRoute]);

  const handlerChangeEditor = (value: string = '') => {
    setValueMonaco(value);
  };
  const handlerGetResponseBtn = () => {
    // TODO:validation
    dispatch(
      sendQueryRequestGraphQL({
        url: GraphQLRoute,
        queryRequest: valueMonaco as string,
        variables: JSON.parse(variables),
        headers: JSON.parse(headers),
      }),
    );
  };

  return (
    <section className={cl.editor} id="graphql-editor">
      <Codemirror
        value={valueMonaco}
        onChange={handlerChangeEditor}
        extensions={[fixedHeightEditor]}
      />
      <button className={cl.editor__button} onClick={handlerGetResponseBtn}>
        GetResponse
      </button>
      <div className={cl.editor__settingRow}>
        <GraphQLVariables />
        <GraphQLHeaders />
      </div>
    </section>
  );
}
