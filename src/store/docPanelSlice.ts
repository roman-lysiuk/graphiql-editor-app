import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IField } from '../GraphQL/DocFetchSchema';

export interface IDocPanelState {
  queryName: string;
  mutationName: string;
  schemas: IField[];
  schemaName: string;
  isDrawerVisible: boolean;
}

export const initialState: IDocPanelState = {
  queryName: '',
  mutationName: '',
  schemas: [],
  schemaName: '',
  isDrawerVisible: false,
};

const docPanelSlice = createSlice({
  name: 'docPanel',
  initialState,
  reducers: {
    setQueryName(state, action: PayloadAction<string>) {
      return { ...state, queryName: action.payload };
    },
    setMutationName(state, action: PayloadAction<string>) {
      return { ...state, mutationName: action.payload };
    },
    setSchemas(state, action: PayloadAction<IField[]>) {
      return { ...state, schemas: action.payload };
    },
    setSchemaName(state, action: PayloadAction<string>) {
      return { ...state, schemaName: action.payload };
    },
    setIsDrawerVisible(state, action: PayloadAction<boolean>) {
      return { ...state, isDrawerVisible: action.payload };
    },
  },
});

export const { setQueryName, setMutationName, setSchemas, setSchemaName, setIsDrawerVisible } =
  docPanelSlice.actions;
export default docPanelSlice.reducer;
