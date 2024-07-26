import { FormSchema, AddsOn } from "@/lib/FormSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  
  interface State {
    addsOn: AddsOn[];
  }

const initialState : FormSchema = {
    name: '',
    email: '',
    phoneNumber: '',
    plan: 'Arcade',
    paymentPlan: 'monthly',
    addsOn: []
}

export const FormSlice = createSlice({
    name: 'step1',
    initialState,
    reducers: {
        setName: (state: { name: string; }, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setEmail: (state: { email: string; }, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPhoneNumber: (state: { phoneNumber: string; }, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setPlan: (state: { plan: string; }, action: PayloadAction<string>) => {
            state.plan = action.payload
        },
        setPaymentPlan: (state: { paymentPlan: string; }, action: PayloadAction<string>) => {
            state.paymentPlan = action.payload
        },
        setAddsOn : (state: State, action: PayloadAction<AddsOn[]>) => {
            state.addsOn = action.payload;
        }
    }
})

export const { setName, setEmail, setPhoneNumber, setPaymentPlan, setPlan, setAddsOn } = FormSlice.actions
export default FormSlice.reducer