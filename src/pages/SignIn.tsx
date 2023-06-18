import React, { useCallback, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View,Alert, StyleSheet } from 'react-native';
function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onSubmit = useCallback(()=>{
        if(!email || !email.trim()) {
            return Alert.alert('알림', '이메일을 입력해주세요')
        }
        if(!password || !password.trim()) {
            return Alert.alert('알림', '비밀번호를 입력해주세요')
        }

        Alert.alert('알림', '로그인 되었습니다.');
    }, [email, password]);
    const onChagePassword = useCallback((text:string) => {
        setPassword(text);
    }, []);
    const onChangeEmail = useCallback((text:string) => {
        setEmail(text);
    }, []);
    const emailRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const canGoNext = email && password;
    
    return (
        <View>
            <View style = {styles.inputWrapper}>
                <Text style = {styles.label}>이메일</Text>
                <TextInput 
                    style = {styles.textInput}
                    placeholder='이메일을 입력하세요!!'
                    value = {email}
                    onChangeText={onChangeEmail}
                    importantForAutofill='yes'
                    autoComplete='email'
                    textContentType='emailAddress' 
                    returnKeyType='next' 
                    onSubmitEditing={()=> {
                        passwordRef.current?.focus; //제출 누르면 패스워드로 포커싱
                    }}
                    keyboardType='email-address'
                    ref = {emailRef}
                    blurOnSubmit = {false} //키보드 내려가는거 막기
                    clearButtonMode='while-editing'
                    ></TextInput> 
            </View>
            <View style = {styles.inputWrapper}>
                <Text style = {styles.label}>비밀번호</Text>
                <TextInput 
                    style = {styles.textInput}
                    placeholder='비밀번호를 입력하세요!!'
                    onChangeText={onChagePassword}
                    secureTextEntry
                    value={password}
                    importantForAutofill='yes'
                    autoComplete='password'
                    textContentType='password'
                    returnKeyType='next'
                    ref = {passwordRef}
                    onSubmitEditing={onSubmit}
                    ></TextInput>
            </View>
            <View style ={styles.buttonZone}>
                <Pressable 
                    onPress = {onSubmit} 
                    style = {
                        !canGoNext
                        ? styles.loginButton
                        : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)} 
                    
                    disabled= {!canGoNext}>
                    <Text style = {styles.loginButtonTextInput}>로그인</Text>
                </Pressable>
                <Pressable>
                    <Text>회원가입</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputWrapper :{
        padding : 20,
    },
    textInput:{
        padding : 5,
        borderBottomWidth : StyleSheet.hairlineWidth,
    },
    label : {
        fontWeight : 'bold',
        fontSize : 16,
        marginBottom : 20,
    },
    loginButton: {
        backgroundColor : 'gray',
        paddingHorizontal : 20,
        paddingVertical : 10,
        borderRadius : 5,
        marginBottom : 10
    },
    loginButtonTextInput : {
        color : 'white',
        fontSize : 16
    },
    loginButtonActive : {
      backgroundColor : 'blue'  
    },
    buttonZone: {
        alignItems:'center',
    }
})
export default SignIn;