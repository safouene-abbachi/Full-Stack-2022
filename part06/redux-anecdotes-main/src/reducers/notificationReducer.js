import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  delay: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      if (state.delay) clearTimeout(state.delay);
      return {
        ...state,
        message: action.payload.message,
        delay: action.payload.delay,
      };
    },
    removeNotification(state, action) {
      return initialState.message;
    },
  },
});

export const { setNotifications, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
