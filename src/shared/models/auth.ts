export interface ResetPasswordReq {
  email: string;
  otpToken: string;
  password: string;
  confirmPassword: string;
}
