import { create } from 'zustand';

const ForgotPasswordStep = {
  SEND_EMAIL: 'SEND_EMAIL',
  RECOVERY_CODE: 'RECOVERY_CODE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
} as const;

export type ForgotPasswordStepType = keyof typeof ForgotPasswordStep;

interface ForgotPasswordStateI {
  step: ForgotPasswordStepType;
  email: string | null;
  otpToken: string | null;
  setEmail: (val: string | null) => void;
  setStep: (step: ForgotPasswordStepType) => void;
  setOtpToken: (val: string | null) => void;
}

export const useForgotPasswordState = create<ForgotPasswordStateI>()((set) => ({
  step: ForgotPasswordStep.SEND_EMAIL,
  email: null,
  otpToken: null,
  setEmail: (val: string | null) => {
    set({ email: val });
  },
  setOtpToken: (val: string | null) => {
    set({ otpToken: val });
  },
  setStep: (step: ForgotPasswordStepType) => {
    set({ step });
  },
}));
