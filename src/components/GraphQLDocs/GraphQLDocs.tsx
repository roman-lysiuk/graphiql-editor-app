import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addMessage } from '../../store/sysMessengerSlice';
import { setOn, setOff } from '../../store/spinnerSlice';
import DocFetchSchema, { IField, schemaParser } from '../../GraphQL/DocFetchSchema';
import DocFetchRootTypes from '../../GraphQL/DocFetchRootTypes';
import useDict from '../../hooks/useDict';

export default function GraphQLDocs() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.graphQL.url);
  const [queryName, setQueryName] = useState('');
  const [mutationName, setMutationName] = useState('');
  const [schemas, setSchemas] = useState<IField[]>([]);
  const [schemaName, setSchemaName] = useState('');

  useEffect(() => {
    dispatch(setOn());
    DocFetchSchema(url, schemaName)
      .then((res) => {
        if (res instanceof Error) {
          dispatch(addMessage({ type: 'error', message: res.message }));
        } else if (res.data.__type && res.data.__type.fields) {
          const arr = schemaParser(res.data.__type.fields);
          if (arr.length) {
            setSchemas(arr);
          }
        }
      })
      .catch((err) => {
        dispatch(addMessage({ type: 'error', message: err.message }));
      })
      .finally(() => {
        dispatch(setOff());
      });
  }, [schemaName, dispatch, url]);

  useEffect(() => {
    setMutationName('');
    setQueryName('');
    setSchemaName('');
    setSchemas([]);
    dispatch(setOn());
    DocFetchRootTypes(url)
      .then((res) => {
        if (res instanceof Error) {
          dispatch(addMessage({ type: 'error', message: res.message }));
        } else if (!res || !res.data || !res.data.__schema) {
          dispatch(addMessage({ type: 'error', message: 'Bad JSON response' }));
        } else if (res.data.__schema) {
          if (res.data.__schema.queryType) {
            setQueryName(res.data.__schema.queryType.name);
          } else {
            setQueryName('');
          }
          if (res.data.__schema.mutationType) {
            setMutationName(res.data.__schema.mutationType.name);
          } else {
            setMutationName('');
          }
          setSchemas([]);
          setSchemaName('');
        }
      })
      .catch((err) => {
        dispatch(addMessage({ type: 'error', message: err.message }));
      })
      .finally(() => {
        dispatch(setOff());
      });
  }, [url, dispatch]);

  return (
    <div>
      <Typography variant="h5">{getDictVal('docTitle')}</Typography>
      <Typography variant="body1">{getDictVal('docDesc')}</Typography>
      <br />
      {!mutationName && !queryName && <Typography>{getDictVal('docNoData')}</Typography>}
      {queryName && (
        <Button sx={{ m: 0.2 }} variant="contained" onClick={() => setSchemaName(queryName)}>
          {queryName}
        </Button>
      )}
      <br />
      {mutationName && (
        <Button sx={{ m: 0.2 }} variant="contained" onClick={() => setSchemaName(mutationName)}>
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
