import { motion as m } from "framer-motion";

interface FooterProps {
  step: number;
  handlePrevStep: () => void;
  handleProceed: () => void;
  isMobile: boolean; // Add a prop to determine if it's mobile layout
}

const FooterBtn = ({ step, handlePrevStep, handleProceed, isMobile }: FooterProps) => {
  const commonButtonClass = "rounded text-white py-1 px-4 ml-auto";
  const stepButtonClass = step === 4 ? "bg-purplish-blue" : "bg-marine-blue";

  return (
    <div className={`bg-white w-full p-2 flex justify-between ${isMobile ? "fixed bottom-0 md:hidden" : "mt-5 hidden md:flex md:absolute md:bottom-2 md:w-[470px]"}`}>
      {step !== 1 && (
        <m.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevStep}
          className="text-cool-gray font-bold"
        >
          {step === 5 ? "Repeat Submission" : "Back"}
        </m.button>
      )}
      {step !== 5 && (
        <m.button
          onClick={handleProceed}
          whileTap={{ scale: 0.9 }}
          className={`${stepButtonClass} ${commonButtonClass}`}
        >
          {step === 4 ? "Confirm" : "Next Step"}
        </m.button>
      )}
    </div>
  );
};

export default FooterBtn;
