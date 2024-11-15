import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  mobile?: string;
  isOtpSent: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  resendTimeout: number;
  error: string | null;
}

const initialState: AuthState = {
  mobile: '',
  isOtpSent: false,
  isAuthenticated: false,
  loading: false,
  resendTimeout: 30, // Cooldown period in seconds
  error: null,
};

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (mobile: string, {rejectWithValue}) => {
    try {
      const response = await fetch('https://api.example.com/send-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mobile}),
      });
      if (!response.ok) throw new Error('Failed to send OTP');
      return mobile;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({mobile, otp}: {mobile: string; otp: string}, {rejectWithValue}) => {
    try {
      const response = await fetch('https://api.example.com/verify-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mobile, otp}),
      });
      if (!response.ok) throw new Error('Invalid OTP');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    startResendTimer: state => {
      state.resendTimeout = 30;
    },
    decrementResendTimeout: state => {
      if (state.resendTimeout > 0) state.resendTimeout -= 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isOtpSent = true;
        state.mobile = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetAuthState, startResendTimer, decrementResendTimeout} =
  AuthSlice.actions;
export default AuthSlice.reducer;
