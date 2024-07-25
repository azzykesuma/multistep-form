import { StepContext } from "@/App";
import HeaderStep from "./HeaderStep";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import Step1Form from "./Step1Form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StepType } from "Types";
import { FormStep1Schema, step1Schema } from "@/lib/FormSchema";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";



const MainForm = () => {
    const {step, setStep} = useContext(StepContext)
    const formData = useSelector((state:RootState) => state.Form);
    const [errors, setErrors] = useState<FormStep1Schema>({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const handleProceed = () => {
      if (step === 1) {
        const { name, email, phoneNumber } = formData;
        const newErrors: FormStep1Schema = {
          name: "",
          email: "",
          phoneNumber: "",
        };

        // Check for empty fields
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";

        // If there are any errors, set them and return
        if (Object.values(newErrors).some((value) => value !== "")) {
          setErrors(newErrors);
          console.log("Errors:", newErrors);
          return;
        }

        // Validate with Zod
        const res = step1Schema.safeParse(formData);
        if (!res.success) {
          const formattedText = res.error.format();
          console.log("formattedText", formattedText);

          if (formattedText.email && formattedText.email._errors.length > 0) {
            newErrors.email = formattedText.email._errors[0] ?? "";
          }
          if (
            formattedText.phoneNumber &&
            formattedText.phoneNumber._errors.length > 0
          ) {
            newErrors.phoneNumber = formattedText.phoneNumber._errors[0] ?? "";
          }

          // Set errors if there are any from Zod validation
          if (newErrors.email || newErrors.phoneNumber) {
            setErrors(newErrors);
            return;
          }
        }

        // If all is well, proceed to the next step
        // empty the error state
        setErrors({
          name: "",
          email: "",
          phoneNumber: "",
        });
        setStep((step + 1) as StepType);
      } else if (step === 2) {
        setStep((step + 1) as StepType);
      }
    };
      
    const handlePrevStep = () => {
        setStep(step - 1 as StepType)
    }

    // useEffect(() => {
    //     console.log('formData:', formData)
    // }, [formData])

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
        </m.div>
      </section>
      <div className="bg-white w-full p-2 flex justify-between  fixed bottom-0">
        {step !== 1 && (
          <button onClick={handlePrevStep} className="text-cool-gray font-bold">
            Go Back
          </button>
        )}
        <button
          onClick={handleProceed}
          className="bg-marine-blue rounded text-white py-1 px-4 ml-auto"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default MainForm;
