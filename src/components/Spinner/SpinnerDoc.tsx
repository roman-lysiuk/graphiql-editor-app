import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { setIsLoading } from '../../store/docPanelSlice';

export default function SpinnerDoc() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch]);

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
