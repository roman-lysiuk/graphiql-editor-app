import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import useDict from '../../hooks/useDict';
import { useAppDispatch } from '../../hooks/redux';
import { setIsLoading } from '../../store/docPanelSlice';

export default function NoData() {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch]);

  return <Typography>{getDictVal('docNoData')}</Typography>;
}
