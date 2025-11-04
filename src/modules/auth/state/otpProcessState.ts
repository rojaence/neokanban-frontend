import { create } from 'zustand';
import { OtpProcessTypeEnum } from '@/modules/otp/models/otp';

const OtpProcessStep = {
  SEND_EMAIL: 'SEND_EMAIL',
  RECOVERY_CODE: 'RECOVERY_CODE',
  VERIFIED_CODE: 'VERIFIED_CODE',
} as const;

export type OtpProcessStepType = keyof typeof OtpProcessStep;

interface OtpProcessStateI {
  step: OtpProcessStepType;
  email: string | null;
  otpToken: string | null;
  processType: keyof typeof OtpProcessTypeEnum | null;
  setEmail: (val: string | null) => void;
  setStep: (step: OtpProcessStepType) => void;
  setOtpToken: (val: string | null) => void;
  setProcessType: (val: keyof typeof OtpProcessTypeEnum) => void;
  isPending: boolean;
  setIsPending: (val: boolean) => void;
}

export const useOtpProcessState = create<OtpProcessStateI>()((set) => ({
  step: OtpProcessStep.SEND_EMAIL,
  email: null,
  otpToken: null,
  isPending: false,
  processType: null,
  setEmail: (val: string | null) => {
    set({ email: val });
  },
  setOtpToken: (val: string | null) => {
    set({ otpToken: val });
  },
  setStep: (step: OtpProcessStepType) => {
    set({ step });
  },
  setIsPending: (val: boolean) => {
    set({ isPending: val });
  },
  setProcessType: (val: keyof typeof OtpProcessTypeEnum) => {
    set({ processType: val });
  },
}));
