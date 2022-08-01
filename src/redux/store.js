import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import headingReducer from "./headingSlice";
import categoriesReducer from './categoriesSlice'
import postsReducer from "./postsSlice";
import pagesReducer from "./pagesSlice";
import authReducer from "./authSlice";


const persistConfig = {
  key: 'store',
  storage: storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  heading: headingReducer,
  categories: categoriesReducer,
  posts: postsReducer,
  pages: pagesReducer,
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)