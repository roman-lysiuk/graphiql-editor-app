import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  id: string | undefined;
  token: string;
  email: string;
}

export const initialState: IUserState = {
  id: undefined,
  token: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      return { ...action.payload };
    },
    removeUser() {
      return initialState;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
