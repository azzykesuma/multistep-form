import { Dispatch, SetStateAction } from "react";

export type StepType = 1 | 2 | 3 | 4
export interface StepContextType {step: StepType;setStep: Dispatch<SetStateAction<StepType>>;}
export interface Step1ErrorLogs {name: string;email: string;phoneNumber: string;}
export type PlanType = 'Arcade' | 'Advanced' | 'Pro'