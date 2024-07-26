import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { plansDetails } from "@/lib/plans";
import { useContext } from "react";
import { StepContext } from "@/App";
import {LayoutStep} from "@/layout/LayoutStep";
const Step4Form = () => {
  const { setStep } = useContext(StepContext);
  const { plan, paymentPlan, addsOn } = useSelector(
    (state: RootState) => state.Form
  );
  const paymentPrice = paymentPlan === "monthly" ? "priceMonth" : "priceYear";
  const selectedPlanPrice = plansDetails.find(({ name }) => name === plan)?.[
    paymentPrice
  ];

  const totalPrice =
    (selectedPlanPrice ?? 0) +
    addsOn.reduce(
      (acc, curr) =>
        acc + (paymentPlan === "monthly" ? curr.priceMonth : curr.priceYear),
      0
    );
  const HandleReturn = () => {
    setStep(2);
  };
  return (
    <LayoutStep>
      <LayoutStep.Header>Finishing up</LayoutStep.Header>
      <p className={`my-6 text-cool-gray`}>
        Double-check everything looks OK before confirming
      </p>
      <div className="bg-magnolia p-4 rounded">
        <div className="flex items-center justify-between p-1">
          <div>
            <h4 className="text-marine-blue font-bold">
              {plan} ({paymentPlan})
            </h4>
            <button className="text-cool-gray underline" onClick={HandleReturn}>
              Change
            </button>
          </div>
          <p className="text-marine-blue font-bold">
            ${selectedPlanPrice}/{paymentPlan === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        <hr className="my-2" />
        {addsOn &&
          addsOn.map((addon, index) => (
            <div key={index} className="flex justify-between">
              <p className=" text-cool-gray">{addon.name}</p>
              <p className="text-marine-blue">
                {paymentPlan === "monthly"
                  ? `+$${addon.priceMonth}/mo`
                  : `+$${addon.priceYear}/yr`}
              </p>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-cool-gray ">
          Total (per {paymentPlan === "monthly" ? "month" : "year"})
        </p>
        <p className="text-purplish-blue font-bold">
          +${totalPrice}/{paymentPlan === "monthly" ? "mo" : "yr"}
        </p>
      </div>
    </LayoutStep>
  );
};

export default Step4Form;
