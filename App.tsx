import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

//화면들
//파라미터
//타입 스크립트
export type LoggedInParamList = {
  Orders: undefined; //주문화면
  Settings: undefined; //설정화면
  Delivery: undefined; //배달기사 화면
  Complete: {orderId: string}; //완료 화면, 주문에 고유한 아이디가 부여되어있다.
}; //다른 페이지에서 지금 페이지로 값을 전달하고 싶을때. 파라미터 유용. 

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};// 엄격하게 타입 선언을 해서 화면 이동 오작동 방지.

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? ( //로그임을 한경우
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '오더 목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내 정보'}}
          />
        </Tab.Navigator>
      ) : ( //로그인을 안한 경우.
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;