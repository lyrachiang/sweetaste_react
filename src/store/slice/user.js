import { createSlice } from '@reduxjs/toolkit';

const localStorageUser = localStorage.getItem('SweetasteUser');

const initialState = {
  isLogin: localStorageUser !== '' ? true : false,
  email: localStorageUser !== '' ? localStorageUser : false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.isLogin = true;
      state.email   = action.payload;

      localStorage.setItem('SweetasteUser', action.payload);
    }
  },
});

const { actions, reducer } = userSlice;

export const { updateUser } = actions;
export const getUser = (state) => state.user;
export default reducer;