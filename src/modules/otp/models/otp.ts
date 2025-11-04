export const OtpProcessTypeEnum = {
  CHANGE_PASSWORD: 'change_password',
} as const;

export interface GeneratedOtpRes {
  success: boolean;
}

export interface VerifyOtpRes {
  otpToken: string;
}

export interface ValidOtpRes {
  otpToken: string;
}

export interface OtpCodeReq {
  processType: keyof typeof OtpProcessTypeEnum;
}

export interface OtpEmailCodeReq extends OtpCodeReq {
  email: string;
}

export interface VerifyOtpReq extends OtpCodeReq {
  code: string;
}

export interface VerifyOtpEmailReq extends OtpCodeReq {
  email: string;
  code: string;
}

export const otpProcessTypeValues = Object.values(OtpProcessTypeEnum);
