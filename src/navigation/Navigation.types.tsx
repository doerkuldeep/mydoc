import {LOGIN_SCREEN, OTP_VERIFICATION_SCREEN} from './Constants';

export type AppStackParamList = {
  [LOGIN_SCREEN]: undefined;
  [OTP_VERIFICATION_SCREEN]: {
    mobile: string;
  };
};
