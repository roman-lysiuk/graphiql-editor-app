import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import getDict from '../../data/dictionary';

export default function ErrorPage() {
  const { lang } = useAppSelector((state) => state.multiLang);

  return (
    <main className="main">
      <Container
        sx={{
          width: '1280px',
          margin: '20% auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2">404: {getDict(lang, 'error404')}</Typography>
      </Container>
    </main>
  );
}
