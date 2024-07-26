import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { Switch } from "./ui/switch";
import { PlanType } from "Types";
import { setPlan, setPaymentPlan } from "@/slices/EditForm";
import { useDispatch, useSelector } from "react-redux";
import {plansDetails} from '@/lib/plans'
import { RootState } from "@/store/store";
import LayoutStep from "@/layout/LayoutStep";

const Step2Form = () => {
  const {paymentPlan, plan}= useSelector((state:RootState) => state.Form);
  const [checked, setIsChecked] = useState(paymentPlan === "yearly");
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(plan || 'Arcade');

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    dispatch(setPlan(plan));
  };
  const handleSwitchPaymentPlan = () => {
    setIsChecked((prev) => !prev);
    dispatch(setPaymentPlan(checked ? "monthly" : "yearly"));
  };
  return (
    <LayoutStep>
      <h1 className={`text-lg text-marine-blue font-bold`}>Select your plan</h1>
      <p className={`my-6 text-cool-gray`}>
        You have the option of monthly or yearly billing
      </p>
      {plansDetails.map((plan) => (
        <m.div
          onClick={() => handleSelectPlan(plan.name as PlanType)}
          role="button"
          whileTap={{ y: 5 }}
          aria-description="plan selection"
          key={plan.name}
          className={`flex items-center gap-4 mb-4 shadow-md drop-shadow-sm p-2 rounded border-opacity-50
                    ${
                      selectedPlan === plan.name
                        ? "border-marine-blue border-[1px] bg-magnolia"
                        : "border-alabaster border-[1px]"
                    }
                    `}
        >
          <img src={plan.image} alt={plan.name} className={`w-10 h-10`} />
          <div>
            <h2 className={`text-lg text-marine-blue font-bold`}>
              {plan.name}
            </h2>
            <p className={`text-cool-gray text-sm`}>
              ${!checked ? `${plan.priceMonth}/mo` : `${plan.priceYear}/year`}
            </p>
            <AnimatePresence>
              {checked && (
                <m.p
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  className="text-marine-blue text-sm"
                >
                  2 months free
                </m.p>
              )}
            </AnimatePresence>
          </div>
        </m.div>
      ))}
      <div className={`flex bg-alabaster p-2 justify-center rounded gap-2`}>
        <p className={`font-bold text-marine-blue`}>Monthly</p>
        <Switch checked={checked} onCheckedChange={handleSwitchPaymentPlan} />
        <p className={`font-bold text-marine-blue`}>Yearly</p>
      </div>
      </LayoutStep>
  );
};

export default Step2Form;
