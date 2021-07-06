import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState:{
    chatId:null,
    chatName: null
  },
 
  reducers: {
   setChatInfo:(state,action)=>{
       state.chatId=action.payload.chatId
       state.chatName=action.payload.chatName
   }
  },
});

export const {setChatInfo}=chatSlice.actions

export const selectChatId = (state) => state.chat.chatId;
export const selectChatName=(state)=>state.chat.chatName;

export default chatSlice.reducer;
