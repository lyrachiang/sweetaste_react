import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/user';
import prodReducer from './slice/prod';
import orderReducer from './slice/order';
import favoriteReducer from './slice/favorite';

export const store = configureStore({
  reducer: {
    user: userReducer,
    prod: prodReducer,
    order: orderReducer,
    favorite: favoriteReducer,
  },
});
