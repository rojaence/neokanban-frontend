import HttpClient from '@/api/httpClient';
import type { HttpResponse } from '@/api/interfaces';
import type {
  GeneratedOtpRes,
  OtpCodeReq,
  OtpEmailCodeReq,
  ValidOtpRes,
  VerifyOtpReq,
  VerifyOtpRes,
} from '../models/otp';

export const BASE_OTP_PATH = 'otp';

export const generateCode = async (payload: OtpCodeReq) => {
  const { data } = await HttpClient.post<HttpResponse<GeneratedOtpRes>>(
    `${BASE_OTP_PATH}/generate`,
    payload,
  );
  return data;
};

export const verifyCode = async (payload: VerifyOtpReq) => {
  const { data } = await HttpClient.post<HttpResponse<VerifyOtpRes>>(
    `${BASE_OTP_PATH}/verify`,
    payload,
  );
  return data;
};

export const getActive = async (payload: OtpCodeReq) => {
  const { data } = await HttpClient.post<HttpResponse<ValidOtpRes>>(
    `${BASE_OTP_PATH}/active`,
    payload,
  );
  return data;
};

export const generateCodeByEmail = async (payload: OtpEmailCodeReq) => {
  const { data } = await HttpClient.post<HttpResponse<ValidOtpRes>>(
    `${BASE_OTP_PATH}/email/generate`,
    payload,
  );
  return data;
};

export const verifyCodeByEmail = async (payload: VerifyOtpReq) => {
  const { data } = await HttpClient.post<HttpResponse<ValidOtpRes>>(
    `${BASE_OTP_PATH}/email/verify`,
    payload,
  );
  return data;
};
