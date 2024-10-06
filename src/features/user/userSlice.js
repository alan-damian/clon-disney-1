import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  photo: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export default userSlice.reducer;
