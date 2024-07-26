import { StepContext } from "@/App";
import {AsideStep, HeaderStep} from "./HeaderStep";
import { useContext, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import Step1Form from "./Step1Form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StepType } from "Types";
import { FormStep1Schema, hasErrors, validateWithZod, handleZodErrors, checkForEmptyFields } from "@/lib/FormSchema";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import Step4Form from "./Step4Form";
import Step5 from "./Step5";
import FooterBtn from "./FooterBtn";



const MainForm = () => {
    const {step, setStep} = useContext(StepContext)
    const formData = useSelector((state:RootState) => state.Form);
    const [errors, setErrors] = useState<FormStep1Schema>({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const getInitialErrors = () => ({
      name: "",
      email: "",
      phoneNumber: "",
    });

    const handleProceed = () => {
      if (step === 1) {
        handleStep1();
      } else {
        setStep((step + 1) as StepType);
      }
    };

    const handleStep1 = () => {
      const { name, email, phoneNumber } = formData;
      const newErrors = getInitialErrors();
    
      checkForEmptyFields(newErrors, { name, email, phoneNumber });
    
      if (hasErrors(newErrors)) {
        setErrors(newErrors);
        return;
      }
    
      const res = validateWithZod(formData);
    
      if (!res.success) {
        handleZodErrors(res.error, newErrors);
    
        if (hasErrors(newErrors)) {
          setErrors(newErrors);
          return;
        }
      }
    
      clearErrors();
      setStep((step + 1) as StepType);
    };

    const clearErrors = () => {
      setErrors({
        name: "",
        email: "",
        phoneNumber: "",
      });
    };
    
    const handlePrevStep = () => {
      if(step === 5) {
        setStep(1)
        return;
      }
        setStep(step - 1 as StepType)
    }


  return (
    <div className="h-full relative md:flex md:flex-col">
      <section className="transform -translate-y-24 mb-52 md:m-auto flex flex-col  justify-center items-center px-4 relative md:translate-y-0">
        <HeaderStep />
        <m.div className="absolute w-[90%] md:w-[800px] mx-auto md:mx-0 top-11 md:relative md:flex md:justify-between md:items-center md:bg-white shadow-none md:shadow-md md:rounded m-auto md:p-4 md:gap-6">
          <AsideStep />
          <div className="basis-2/3">
            <AnimatePresence>
              {step === 1 && <Step1Form error={errors} />}
            </AnimatePresence>
            <AnimatePresence>{step === 2 && <Step2Form />}</AnimatePresence>
            <AnimatePresence>{step === 3 && <Step3Form />}</AnimatePresence>
            <AnimatePresence>{step === 4 && <Step4Form />}</AnimatePresence>
            <AnimatePresence>{step === 5 && <Step5 />}</AnimatePresence>
          <div className="hidden md:block md:relativen md:w-fit">
          <FooterBtn 
            isMobile={false}
            step={step}
            handlePrevStep={handlePrevStep}
            handleProceed={handleProceed}
          />
          </div>
        </div>
        </m.div>
      </section>
      <FooterBtn
        handlePrevStep={handlePrevStep}
        handleProceed={handleProceed}
        step={step}
        isMobile
      />
    </div>
  );
};

export default MainForm;
