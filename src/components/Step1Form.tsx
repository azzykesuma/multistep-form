import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setEmail, setName, setPhoneNumber } from "@/slices/EditForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FormStep1Schema } from "@/lib/FormSchema";
import {LayoutStep} from "@/layout/LayoutStep";
interface Step1FormProps {
    error: FormStep1Schema;
}

const Step1Form = ({error}: Step1FormProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.Form);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const actionMap: { [key: string]: ActionCreatorWithPayload<string> } = {
      name: setName,
      email: setEmail,
      phone: setPhoneNumber,
    };
    const actionCreator = actionMap[id];
    if (actionCreator) {
      dispatch(actionCreator(value));
    }
  };

  return (
    <LayoutStep>
      <LayoutStep.Header>Personal info</LayoutStep.Header>
      <p className="my-6 text-cool-gray ">
        Please Provide your name, email address and phone number
      </p>
      <form>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="e.g. Stephen King"
            value={formData.name}
            onChange={handleChange}
          />
          <AnimatePresence>
            {error.name && (
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="text-red-500 text-sm"
              >
                {error.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="text"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.email}
            onChange={handleChange}
          />
          <AnimatePresence>
            {error.email && (
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="text-red-500 text-sm"
              >
                {error.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            placeholder="e.g. + 1 234 567 890"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <AnimatePresence>
            {error.phoneNumber && (
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="text-red-500 text-sm"
              >
                {error.phoneNumber}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </LayoutStep>
  );
};

export default Step1Form;
