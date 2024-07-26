import { StepContext } from "@/App";
import { useContext } from "react";
import { motion } from "framer-motion";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { StepType } from "Types";

const StepButtons = ({
  step,
  setStep,
  stepButtons,
}: {
  step: number;
  setStep: (label: StepType) => void;
  stepButtons: { label: number; disabled: boolean; desc: string }[];
}) => (
  <>
    {stepButtons.map((item) => (
      <div key={item.label} className="block md:flex md:gap-4">
        <motion.button
          className={`rounded-full border-[1px] border-white w-6 h-6 text-sm ${
            step === item.label
              ? "bg-white text-black"
              : "bg-transparent text-white"
          } disabled:opacity-30 disabled:bg-cool-gray`}
          onClick={() => setStep(item.label as StepType)}
          whileTap={{
            scale: 0.9,
          }}
          disabled={item.disabled}
        >
          {item.label}
        </motion.button>
        <div className="hidden : md:block">
          <p className="text-white font-thin text-sm">Step {item.label}</p>
          <p className="text-white font-bold text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </>
);

const useStepButtons = () => {
  const { step, setStep } = useContext(StepContext);
  const formData = useSelector((state: RootState) => state.Form);
  const part1Form = {
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
  };
  const stepButtons = [
    { label: 1, disabled: false, desc: "Your Info" },
    {
      label: 2,
      disabled: !part1Form.name || !part1Form.email || !part1Form.phoneNumber,
      desc: "SELECT PLAN",
    },
    { label: 3, disabled: step === 1, desc: "ADD-ONS" },
    { label: 4, disabled: step === 1 || step === 2, desc: "SUMMARY" },
  ];

  return { step, setStep, stepButtons };
};

export const HeaderStep = () => {
  const { step, setStep, stepButtons } = useStepButtons();
  return (
    <div className="flex gap-4 absolute z-20 md:flex-col md:hidden">
      <StepButtons step={step} setStep={setStep} stepButtons={stepButtons} />
    </div>
  );
};

export const AsideStep = () => {
  const { step, setStep, stepButtons } = useStepButtons();
  return (
    <aside className="md:flex flex-col  gap-8 hidden p-4 bg-desktopImage w-1/4 bg-no-repeat bg-cover h-[500px] rounded-lg">
      <StepButtons step={step} setStep={setStep} stepButtons={stepButtons} />
    </aside>
  );
};
