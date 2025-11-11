import { configureStore } from '@reduxjs/toolkit';
import guidesReducer from './store/guidesSlice';

export const store = configureStore({
  reducer: {
    guides: guidesReducer,
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del propio store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;