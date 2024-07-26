import { StepContext } from "@/App";
import HeaderStep from "./HeaderStep";
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
    <div className="h-full relative">
      <section className="transform -translate-y-24 mb-52 flex flex-col justify-center items-center px-4 relative ">
        <HeaderStep />
        <m.div className="absolute w-[90%] mx-auto top-11">
          <AnimatePresence>
            {step === 1 && <Step1Form error={errors} />}
          </AnimatePresence>
          <AnimatePresence>{step === 2 && <Step2Form />}</AnimatePresence>
          <AnimatePresence>{step === 3 && <Step3Form />}</AnimatePresence>
          <AnimatePresence>{step === 4 && <Step4Form />}</AnimatePresence>
          <AnimatePresence>{step === 5 && <Step5 />}</AnimatePresence>
        </m.div>
      </section>
      <div className="bg-white w-full p-2 flex justify-between  fixed bottom-0">
        {step !== 1 && (
          <button onClick={handlePrevStep} className="text-cool-gray font-bold">
            {step === 5 ? "Repeat Submission" : "Back"}
          </button>
        )}
        {step !== 5 && (
        <button
          onClick={handleProceed}
          className={`${step === 4 ? 'bg-purplish-blue' : 'bg-marine-blue '} rounded text-white py-1 px-4 ml-auto`}
        >
          {step === 4 ? 'Confirm' : 'Next Step'}
        </button>
        )}
      </div>
    </div>
  );
};

export default MainForm;
