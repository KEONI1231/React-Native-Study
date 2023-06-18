import Complete from './Complete';
import Ing from './Ing';
import {
    Text,
    View
} from 'react-native';
import { 
    
    createNativeStackNavigator,

} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function Delivery() {
    return ( 
        <Stack.Navigator initialRouteName='Ing'>
             <Stack.Screen name = "Ing" component={Ing} options={{headerShown : false}}/>
             <Stack.Screen 
             name = "Complete" 
             component={Complete} 
             options={{headerShown : false}} />
        </Stack.Navigator>
    );
}
export default Delivery;