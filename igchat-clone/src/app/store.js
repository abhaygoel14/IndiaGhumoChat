import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice'
import chatReducer from '../features/chatSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    app:appReducer
  },
});
