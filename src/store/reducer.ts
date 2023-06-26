import {combineReducers} from '@reduxjs/toolkit';

import userSlices from '../slices/user';
import orderSlice from '../slices/order';

const rootReducer = combineReducers({
  user: userSlices.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
