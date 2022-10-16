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
        message: action.payload,
      };
    },
    removeNotification(state, action) {
      setTimeout(() => {
        return initialState.message;
      }, 5000);
    },
  },
});

export const { setNotifications, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
