import {
  generateCode,
  generateCodeByEmail,
  verifyCode,
  verifyCodeByEmail,
} from '@/modules/otp/repositories/otpRepository';
import { useMutation } from '@tanstack/react-query';

export const useGenerateCode = () => {
  return useMutation({
    mutationFn: generateCode,
  });
};

export const useGenerateCodeByEmail = () => {
  return useMutation({
    mutationFn: generateCodeByEmail,
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
  });
};

export const useVerifyCodeByEmail = () => {
  return useMutation({
    mutationFn: verifyCodeByEmail,
  });
};
