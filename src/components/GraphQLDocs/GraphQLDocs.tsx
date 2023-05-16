import React, { Suspense } from 'react';
import { Button, Container } from '@mui/material';
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
    <Container sx={{ p: 1, minWidth: '400px' }}>
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
      <Suspense fallback={<SpinnerDoc />}>
        <DataRoutes data={data} />
      </Suspense>
    </Container>
  );
}
