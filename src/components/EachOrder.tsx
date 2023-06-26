import {Alert, LogBox, Pressable, StyleSheet, Text, View} from 'react-native';
import orderSlice, {Order} from '../slices/order';
import {useCallback, useState} from 'react';
import {useAppDispatch} from '../store';
import axios, {AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import EncryptedStorage from 'react-native-encrypted-storage';

function EachOrder({item}: {item: Order}) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const toggleDetail = useCallback(() => {
    setDetail(prev => !prev);
  }, []);
  const [detail, setDetail] = useState(false);

  const onAccept = useCallback(async () => {
    try {
      setLoading(false);
      await axios.post(
        'http://127.0.0.1:3105/accept',
        {orderId: item.orderId},
        {headers: {authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        //성공은 200

        Alert.alert('알림', '다른 사람이 이미 수락한 배달입니다.');

        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    } finally {
      setLoading(true);
    }
    dispatch(orderSlice.actions.acceptOrder(item.orderId));
  }, [dispatch, navigation, dispatch, item.orderId]);
  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item.orderId]);
  return (
    <View key={item.orderId} style={styles.odrderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <Text>삼성동</Text>
        <Text>왕십리동</Text>
      </Pressable>
      <Text>{`${item.orderId},  ${item.start.latitude} : ${item.start.longitude}`}</Text>
      {detail ? (
        <View>
          <View>
            <Text>네이버맵이 들어갈 장소</Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={onAccept}
                disabled={loading}
                style={styles.acceptButton}>
                <Text style={styles.buttonText}> 수락 </Text>
              </Pressable>
              <Pressable
                onPress={onReject}
                disabled={loading}
                style={styles.rejectButton}>
                <Text style={styles.buttonText}> 거절 </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  odrderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachInfo: {
    //flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottonLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,

    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EachOrder;
