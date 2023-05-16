import React, { Suspense } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';
import { setIsDrawerVisible } from '../../store/docPanelSlice';
import DataRoutes from '../DataRoutes/DataRoutes';
import { useFetchDocRoot } from '../../hooks/useFetchDocRoot';
import SpinnerDoc from '../Spinner/SpinnerDoc';

export default function GraphQLDocs() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const { url } = useAppSelector((state) => state.graphQL);
  const data = useFetchDocRoot(url);

  return (
    <Container sx={{ p: 1 }} style={{ width: '30rem' }}>
      <Button
        variant="contained"
        sx={{ width: '100%', zIndex: 200 }}
        color="error"
        onClick={() => dispatch(setIsDrawerVisible(false))}
      >
        {getDictVal('docClosePanel')}
      </Button>
      <br />
      <br />
      <Typography sx={{ textAlign: 'center' }} variant="h5">
        {getDictVal('docTitle')}
      </Typography>
      <br />
      <Typography variant="h6">{getDictVal('docDesc')}</Typography>
      <br />
      <Suspense fallback={<SpinnerDoc />}>
        <DataRoutes data={data} />
      </Suspense>
    </Container>
  );
}
