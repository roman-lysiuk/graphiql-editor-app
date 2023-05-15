import React, { useCallback, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addMessage } from '../../store/sysMessengerSlice';
import DocFetchSchema, { IField, schemaParser } from '../../GraphQL/DocFetchSchema';
import DocFetchRootTypes, { IRootJsonSchema } from '../../GraphQL/DocFetchRootTypes';
import useDict from '../../hooks/useDict';
import {
  setIsDrawerVisible,
  setIsLoading,
  setMutationName,
  setQueryName,
  setSchemaName,
  setSchemas,
} from '../../store/docPanelSlice';
import SpinnerDoc from '../Spinner/SpinnerDoc';

export default function GraphQLDocs() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.graphQL.url);

  const { queryName, mutationName, schemaName, schemas, isLoading } = useAppSelector(
    (state) => state.docPanel,
  );

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
    dispatch(setIsLoading(true));
    DocFetchRootTypes(url)
      .then((res) => {
        if (res instanceof Error) {
          dispatch(addMessage({ type: 'error', message: res.message }));
        } else if (!res || !res.data || !res.data.__schema) {
          dispatch(addMessage({ type: 'error', message: 'Bad JSON response' }));
        } else if (res.data.__schema) {
          setRootSchema(res.data.__schema);
        }
      })
      .catch((err) => {
        dispatch(addMessage({ type: 'error', message: err.message }));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [url, dispatch, setRootSchema]);

  useEffect(() => {
    dispatch(setIsLoading(true));
    DocFetchSchema(url, schemaName)
      .then((res) => {
        if (res instanceof Error) {
          dispatch(addMessage({ type: 'error', message: res.message }));
        } else if (res.data.__type && res.data.__type.fields) {
          const arr = schemaParser(res.data.__type.fields);
          if (arr.length) {
            dispatch(setSchemas(arr));
          }
        }
      })
      .catch((err) => {
        dispatch(addMessage({ type: 'error', message: err.message }));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [schemaName, dispatch, url]);

  return (
    <div>
      {isLoading && <SpinnerDoc />}
      <Container sx={{ p: 1 }}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          color="error"
          onClick={() => dispatch(setIsDrawerVisible(false))}
        >
          {getDictVal('docClosePanel')}
        </Button>
        <br />
        <br />
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
      </Container>
    </div>
  );
}
