import React, { useMemo } from 'react';
import { Drawer } from '@mui/material';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import { useAppSelector } from '../../hooks/redux';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function Main() {
  const theme = useAppSelector((state) => state.theme);
  const { isDrawerVisible } = useAppSelector((state) => state.docPanel);
  const graphqlDoc = useMemo(() => <GraphQLDocs />, []);

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
      <ErrorBoundary>
        <GraphQLRoute />
        <GraphQLEditor />
        <GraphQLResponse />
        <Drawer
          anchor="right"
          open={isDrawerVisible}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {graphqlDoc}
        </Drawer>
      </ErrorBoundary>
    </main>
  );
}
