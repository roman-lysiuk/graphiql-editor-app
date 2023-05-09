import React, { Suspense } from 'react';
import { Drawer } from '@mui/material';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import { useAppSelector } from '../../hooks/redux';

export default function Main() {
  const { isDrawerVisible } = useAppSelector((state) => state.docPanel);
  return (
    <main className="main">
      <GraphQLRoute />
      <GraphQLEditor />
      <Suspense fallback={<p>Loading...</p>}>
        <GraphQLResponse />
      </Suspense>
      <Drawer
        anchor="right"
        open={isDrawerVisible}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <GraphQLDocs />
      </Drawer>
    </main>
  );
}
