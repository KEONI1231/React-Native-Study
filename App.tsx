import * as React from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { 
  Pressable,
  Text, 
  TouchableHighlight, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  View 
} from 'react-native';

import { useCallback } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  const moveNextScreen = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  /*
    기본 좌측 상단
    justifyContents = 'center' 세로 중앙
    justifyContents = 'flex-end' 세로 하단
    alignItems = 'center" 가로 중앙
  */
  return (
    <View style ={{flexDirection:'row', }}>          
    <View style={{height:50, flex: 1, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={moveNextScreen} style = {{backgroundColor : 'skyblue'}}>
        <Text style ={{color : 'white'}}>Home Screen</Text>
      </Pressable>
    </View>
    <View style ={{flex:1 ,backgroundColor:'orange',alignItems :'center', justifyContent:'center'}}>
      <Text style = {{color: Colors.white}}>second</Text>
      </View>
    <View style ={{flex:1 ,backgroundColor:'blue', alignItems: 'center', justifyContent:'center'}}>
      <Text style = {{color : Colors.white}}>third</Text>
      </View>
    </View>
  );
}

function DetailsScreen({ navigation }: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
// function Stack() {
//   return <View></View>
// }
// function Navigator() {
//   return <View></View>

// }
// function Screen() {
//   return <View></View>
// }


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '홈화면', }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;