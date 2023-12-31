import {PayloadAction, createSlice} from '@reduxjs/toolkit';

//state -> root reducer(root) -> user slice, order slice
//state.user.email
//state.order
//state.ui

//action : state를 바꾸는 동작/행위
//dispatch : 그 액션을 실제로 실행하는 함수
//reducer : 액션이 실제로 실행되면 state를 바꾸는 로직
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //동기액션
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setName(state, action) {
      state.name = action.payload.name;
    },
    setEmail(state, action) {
      state.email = action.payload.state;
    },
    ///setMoney(state, action: PayloadAction<number>) {
    setMoney(state, action) {
      state.money = action.payload;
    },
    setAcessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {}, //비동기 액션
});

export default userSlice;
