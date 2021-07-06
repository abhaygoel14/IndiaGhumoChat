import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelId: null,
    channelName: null
  },
  reducers: {
    setChannelInfo : (state, action) => {
      state.channelId = action.payload
      state.channelName = action.payload
    },
  }
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.channelId;
export const selectChannelName = (state) => state.channelName;

export default appSlice.reducer;