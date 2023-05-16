import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material';
import { IRootJson } from '../../hooks/useFetchDocRoot';
import useDict from '../../hooks/useDict';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsLoading } from '../../store/docPanelSlice';

interface IProps {
  data: {
    read(): IRootJson;
  };
}

interface IField {
  name: string;
  description: string;
  kind: string;
}

export default function DataRoutes(props: IProps) {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.docPanel);
  const { data } = props;
  const response = data.read();
  if (
    response &&
    response.data &&
    response.data.__schema &&
    (response.data.__schema.mutationType || response.data.__schema.queryType)
  ) {
    const querySchema = response.data.__schema.queryType || null;
    const mutationsSchema = response.data.__schema.mutationType || null;

    const queryFields: IField[] = [];
    const mutatuionsFields: IField[] = [];

    if (querySchema?.fields && querySchema.fields.length > 0) {
      for (let i = 0; i < querySchema.fields.length; i += 1) {
        const el: IField = { name: '', description: '', kind: '' };
        if (querySchema.fields[i].name) el.name = querySchema.fields[i].name;
        if (querySchema.fields[i].description)
          el.description = querySchema.fields[i].description || '';
        if (querySchema.fields[i].type.name) el.name += `(${querySchema.fields[i].type.name})`;
        if (querySchema.fields[i].type.kind) el.kind = querySchema.fields[i].type.kind || '';
        queryFields.push(el);
      }
    }

    if (mutationsSchema?.fields && mutationsSchema.fields.length > 0) {
      for (let i = 0; i < mutationsSchema.fields.length; i += 1) {
        const el: IField = { name: '', description: '', kind: '' };
        if (mutationsSchema.fields[i].name) el.name = mutationsSchema.fields[i].name;
        if (mutationsSchema.fields[i].description)
          el.description = mutationsSchema.fields[i].description || '';
        if (mutationsSchema.fields[i].type.name)
          el.name += `(${mutationsSchema.fields[i].type.name})`;
        if (mutationsSchema.fields[i].type.kind)
          el.kind = mutationsSchema.fields[i].type.kind || '';
        mutatuionsFields.push(el);
      }
    }
    if (!isLoading) dispatch(setIsLoading(true));
    return (
      <>
        {querySchema && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h5">query: {querySchema.name}</Typography>
              {querySchema?.description && (
                <Typography variant="h6">{querySchema?.description}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {queryFields.map((el: IField) => (
                <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                  <Typography variant="body1">
                    <strong>{getDictVal('docName')}: </strong> {el.name}
                  </Typography>
                  {el.description && (
                    <Typography variant="body1">
                      <strong>{getDictVal('docDescription')}: </strong> {el.description}
                    </Typography>
                  )}
                  {el.kind && (
                    <Typography variant="body1">
                      <strong>{getDictVal('docType')}: </strong> {el.kind}
                    </Typography>
                  )}
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>
        )}

        {mutationsSchema && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h5">mutation: {mutationsSchema.name}</Typography>
              {mutationsSchema?.description && (
                <Typography variant="h6">{mutationsSchema?.description}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {mutatuionsFields.map((el: IField) => (
                <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                  <Typography variant="body1">
                    <strong>{getDictVal('docName')}: </strong> {el.name}
                  </Typography>
                  {el.description && (
                    <Typography variant="body1">
                      <strong>{getDictVal('docDescription')}: </strong> {el.description}
                    </Typography>
                  )}
                  {el.kind && (
                    <Typography variant="body1">
                      <strong>{getDictVal('docType')}: </strong> {el.kind}
                    </Typography>
                  )}
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
      </>
    );
  }
  if (isLoading) dispatch(setIsLoading(false));
  return <Typography>{getDictVal('docNoData')}</Typography>;
}
