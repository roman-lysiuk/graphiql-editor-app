import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function SpinnerDoc() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)',
      }}
    >
      <CircularProgress size="10rem" sx={{ color: 'rgba(255,255,255,0.8)' }} />
    </Box>
  );
}
