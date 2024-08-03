'use client';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/todo/todosSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';


  const reducers = combineReducers({
    counter: counterReducer
  });

  const persistConfig = {
    key: 'root',
    whitelist: ['counter'],
    // blcaklist: ['data'],
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  })

export const persistor = persistStore(store);

export default store;
// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']