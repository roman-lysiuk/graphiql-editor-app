import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  id: number;
  login: string;
  email: string;
}

const initialState: IUserState = {
  id: 0,
  login: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      return { ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
