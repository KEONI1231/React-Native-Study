import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';
import {Config} from 'react-native-config';

let socket: Socket | undefined; //전역 변수 // 소켓에서만 전역변수 필요함/.

const useSocket = (): [typeof socket, () => void] => {
  //void 는 return socket = undefined에 대한 반환

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined; //소켓의 연결을 끊었으니 다시 undifined형태로
    }
  }, []); //서버와 연결을 끊는 함수
  if (!socket) {
    socket = io('http://127.0.0.1:3105', {
      transports: ['websocket'],
      //  path : '/socket-io',
    });
  }
  return [socket, disconnect]; //타입 스크립트는 변수, 매개변수 리턴값 타입을 지정해줘야 함.
};

export default useSocket;
