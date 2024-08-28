import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ page, search, domain, gender, available }) => {
  const response = await axios.get(`http://localhost:8080/api/users`, {
    params: { page, search, domain, gender, available }
  });
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  const response = await axios.put(`http://localhost:8080/api/users/${id}`, userData);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;












