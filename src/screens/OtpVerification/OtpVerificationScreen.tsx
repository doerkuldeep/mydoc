import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '../../navigation/Navigation.types';
import {
  LOGIN_SCREEN,
  OTP_VERIFICATION_SCREEN,
} from '../../navigation/Constants';
import {decrementResendTimeout, verifyOtp, sendOtp} from '../../Auth/AuthSlice';
import {useAppDispatch, useAppSelector} from '../../Store/Hooks';

type OtpScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  typeof OTP_VERIFICATION_SCREEN
>;
type OtpScreenRouteProp = RouteProp<
  AppStackParamList,
  typeof OTP_VERIFICATION_SCREEN
>;

type Props = {
  navigation: OtpScreenNavigationProp;
  route: OtpScreenRouteProp;
};

const OtpVerificationScreen: React.FC<Props> = ({navigation, route}) => {
  const {mobile} = route.params;
  const [otp, setOtp] = useState('');
  const dispatch = useAppDispatch();
  const {loading, error, resendTimeout} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setInterval(() => {
        dispatch(decrementResendTimeout());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimeout, dispatch]);

  const handleVerifyOtp = () => {
    dispatch(verifyOtp({mobile, otp})).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigation.navigate(LOGIN_SCREEN);
      }
    });
  };

  const handleResendOtp = () => {
    dispatch(sendOtp(mobile));
  };

  return (
    <View style={styles.container}>
      <Text>Enter the OTP sent to {mobile}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button
        title={loading ? 'Verifying...' : 'Verify OTP'}
        onPress={handleVerifyOtp}
      />
      {resendTimeout > 0 ? (
        <Text style={styles.resendText}>
          Resend OTP in {resendTimeout} seconds
        </Text>
      ) : (
        <Button title="Resend OTP" onPress={handleResendOtp} />
      )}
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
  resendText: {
    marginTop: 10,
    color: 'gray',
  },
  error: {
    color: 'red',
  },
});

export default OtpVerificationScreen;
