import { StepContext } from "@/App";
import { useContext } from "react";
import { motion } from "framer-motion";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { StepType } from "Types";

const HeaderStep = () => {
  const { step, setStep } = useContext(StepContext);
  const formData = useSelector((state: RootState) => state.Form);
  const part1Form = {
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
  };
  const stepButtons = [
    {
      label: 1,
      disabled: false,
    },
    {
      label: 2,
      disabled: !part1Form.name || !part1Form.email || !part1Form.phoneNumber,
    },
    {
      label: 3,
      disabled: step === 1,
    },
    {
      label: 4,
      disabled: step === 1 || step === 2,
    },
  ];
  return (
    <div className="flex gap-4 absolute z-20">
      {stepButtons.map((item) => (
        <motion.button
          className={`rounded-full border-[1px] border-white w-6 h-6 text-sm ${
            step === item .label? "bg-white text-black" : "bg-transparent text-white"
          } disabled:opacity-30 disabled:bg-cool-gray`}
          key={item.label}
          onClick={() => setStep(item.label as StepType)}
          whileTap={{
            scale: 0.9,
          }}
          disabled={item.disabled}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
};

export default HeaderStep;
