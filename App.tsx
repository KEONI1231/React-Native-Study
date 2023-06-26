import * as React from 'react';
import store from './src/store/index';
import { Provider, useSelector } from 'react-redux';
import AppInner from './AppInner';

//화면들
//파라미터
//타입 스크립트

function App() {
  return (
    <Provider store = {store}>
      <AppInner />
    </Provider>
  );
}

export default App;