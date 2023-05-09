import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addMessage } from '../../store/sysMessengerSlice';
import { setOn, setOff } from '../../store/spinnerSlice';
import DocFetchSchema, { IField, schemaParser } from '../../GraphQL/DocFetchSchema';
import DocFetchRootTypes, { IRootJsonSchema } from '../../GraphQL/DocFetchRootTypes';
import useDict from '../../hooks/useDict';
import {
  setIsDrawerVisible,
  setMutationName,
  setQueryName,
  setSchemaName,
  setSchemas,
} from '../../store/docPanelSlice';

export default function GraphQLDocs() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.graphQL.url);

  const { queryName, mutationName, schemaName, schemas } = useAppSelector(
    (state) => state.docPanel,
  );

  const fetchSchemeCache = useRef(new Map());
  const fetchRootCache = useRef(new Map());

  const setRootSchema = useCallback(
    (schema: IRootJsonSchema) => {
      if (schema.queryType) {
        dispatch(setQueryName(schema.queryType.name));
      } else {
        dispatch(setQueryName(''));
      }
      if (schema.mutationType) {
        dispatch(setMutationName(schema.mutationType.name));
      } else {
        dispatch(setMutationName(''));
      }
      dispatch(setSchemas([]));
      dispatch(setSchemaName(''));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setMutationName(''));
    dispatch(setQueryName(''));
    dispatch(setSchemaName(''));
    dispatch(setSchemas([]));
    if (fetchRootCache.current.has(url)) {
      setRootSchema(fetchRootCache.current.get(url));
    } else {
      dispatch(setOn());
      DocFetchRootTypes(url)
        .then((res) => {
          if (res instanceof Error) {
            dispatch(addMessage({ type: 'error', message: res.message }));
          } else if (!res || !res.data || !res.data.__schema) {
            dispatch(addMessage({ type: 'error', message: 'Bad JSON response' }));
            fetchRootCache.current.set(url, {});
          } else if (res.data.__schema) {
            fetchRootCache.current.set(url, res.data.__schema);
            setRootSchema(res.data.__schema);
          }
        })
        .catch((err) => {
          dispatch(addMessage({ type: 'error', message: err.message }));
        })
        .finally(() => {
          dispatch(setOff());
        });
    }
  }, [url, dispatch, setRootSchema]);

  useEffect(() => {
    if (fetchSchemeCache.current.has(url + schemaName)) {
      dispatch(setSchemas(fetchSchemeCache.current.get(url + schemaName)));
    } else {
      dispatch(setOn());
      DocFetchSchema(url, schemaName)
        .then((res) => {
          if (res instanceof Error) {
            dispatch(addMessage({ type: 'error', message: res.message }));
          } else if (res.data.__type && res.data.__type.fields) {
            const arr = schemaParser(res.data.__type.fields);
            if (arr.length) {
              dispatch(setSchemas(arr));
            }
            fetchSchemeCache.current.set(url + schemaName, arr);
          } else {
            fetchSchemeCache.current.set(url + schemaName, []);
          }
        })
        .catch((err) => {
          dispatch(addMessage({ type: 'error', message: err.message }));
        })
        .finally(() => {
          dispatch(setOff());
        });
    }
  }, [schemaName, dispatch, url]);

  return (
    <div style={{ padding: 5 }}>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        color="error"
        onClick={() => dispatch(setIsDrawerVisible(false))}
      >
        Close panel
      </Button>
      <Typography variant="h5">{getDictVal('docTitle')}</Typography>
      <Typography variant="body1">{getDictVal('docDesc')}</Typography>
      <br />
      {!mutationName && !queryName && <Typography>{getDictVal('docNoData')}</Typography>}
      {queryName && (
        <Button
          sx={{ m: 0.2 }}
          variant="contained"
          onClick={() => dispatch(setSchemaName(queryName))}
        >
          {queryName}
        </Button>
      )}
      <br />
      {mutationName && (
        <Button
          sx={{ m: 0.2 }}
          variant="contained"
          onClick={() => dispatch(setSchemaName(mutationName))}
        >
          {mutationName}
        </Button>
      )}
      <br />
      <br />
      {schemaName && (
        <Typography variant="h5">
          {schemaName} {getDictVal('docFields')}
        </Typography>
      )}
      <br />
      {schemaName &&
        schemas.map((el: IField) => (
          <Paper key={String(el.name) + String(el.description)} sx={{ p: 1, m: 1 }} elevation={3}>
            {el.name && (
              <Typography>
                <strong>{getDictVal('docName')}: </strong>
                {el.name}
              </Typography>
            )}
            {el.model && (
              <Typography>
                <strong>{getDictVal('docModel')}: </strong>
                {el.model}
              </Typography>
            )}
            {el.description && (
              <Typography>
                <strong>{getDictVal('docDescription')}: </strong>
                {el.description}
              </Typography>
            )}
            {el.type && (
              <Typography>
                <strong>{getDictVal('docType')}: </strong>
                {el.type}
              </Typography>
            )}
          </Paper>
        ))}
    </div>
  );
}
