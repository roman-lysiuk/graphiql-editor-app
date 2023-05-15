import React, { Suspense } from 'react';
import { Drawer } from '@mui/material';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import { useAppSelector } from '../../hooks/redux';
import Spinner from '../../components/Spinner/Spinner';

export default function Main() {
  const theme = useAppSelector((state) => state.theme);
  const { isDrawerVisible } = useAppSelector((state) => state.docPanel);
  return (
    <main
      className="main"
      style={
        theme.isDarkMode
          ? {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/back_GraphQL.jpg")',
            }
          : {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/wall-light.jpeg")',
              backgroundSize: 'cover',
            }
      }
    >
      <GraphQLRoute />
      <GraphQLEditor />
      <Suspense fallback={<Spinner />}>
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
