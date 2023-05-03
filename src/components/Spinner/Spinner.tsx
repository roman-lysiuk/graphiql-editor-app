import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';

export default function Spinner() {
  const { isProcess } = useAppSelector((state) => state.spinner);
  return (
    <Fade in={isProcess}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.7)',
        }}
      >
        <CircularProgress size="10rem" sx={{ color: 'rgba(255,255,255,0.8)' }} />
      </Box>
    </Fade>
  );
}
