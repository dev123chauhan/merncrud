import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  members: [],
  team: null,
  status: 'idle',
  error: null,
};

export const createTeam = createAsyncThunk('team/createTeam', async (teamData) => {
  const response = await axios.post('http://localhost:8080/api/team', teamData);
  return response.data;
});

export const fetchTeam = createAsyncThunk('team/fetchTeam', async (teamId) => {
  const response = await axios.get(`http://localhost:8080/api/team/${teamId}`);
  return response.data;
});

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addToTeam: (state, action) => {
      if (!state.members.some(member => member.domain === action.payload.domain)) {
        state.members.push(action.payload);
      }
    },
    removeFromTeam: (state, action) => {
      state.members = state.members.filter(member => member._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.fulfilled, (state, action) => {
        state.team = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.team = action.payload;
        state.status = 'succeeded';
      });
  },
});
export const { addToTeam, removeFromTeam } = teamSlice.actions;
export default teamSlice.reducer;