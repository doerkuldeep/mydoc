import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {AppStackParamList} from '../../navigation/Navigation.types';
import {
  LOGIN_SCREEN,
  OTP_VERIFICATION_SCREEN,
} from '../../navigation/Constants';
import {useAppDispatch, useAppSelector} from '../../Store/Hooks';
import {sendOtp, startResendTimer} from '../../Auth/AuthSlice';

type LoginScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  typeof LOGIN_SCREEN
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth);

  const handleSendOtp = () => {
    dispatch(sendOtp(mobile)).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(startResendTimer());
        navigation.navigate(OTP_VERIFICATION_SCREEN, {mobile});
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <Button
        title={loading ? 'Sending...' : 'Send OTP'}
        onPress={handleSendOtp}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});

export default LoginScreen;
