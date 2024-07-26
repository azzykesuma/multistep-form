import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import {setAddsOn} from '@/slices/EditForm'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {LayoutStep} from "@/layout/LayoutStep";

const Step3Form = () => {
  const dispatch = useDispatch();
  const {paymentPlan,addsOn} = useSelector((state: RootState) => state.Form);
  const addsOnOptions = [
    {
      id: 1,
      name: "Online Services",
      desc: "Access to multiplayer games",
      priceYear: 10,
      priceMonth: 1,
      checked: addsOn.find((option) => option.id === 1) || false,
    },
    {
      id: 2,
      name: "Larger storage",
      desc: "Extra 1tb of cloud save",
      priceYear: 20,
      priceMonth: 2,
      checked: addsOn.find((option) => option.id === 2) || false,
    },
    {
      id: 3,
      name: "Customizable profile",
      desc: "Custom theme on your profile",
      priceYear: 20,
      priceMonth: 2,
      checked: addsOn.find((option) => option.id === 3) || false,
    },
  ];
  const [optionsState, setOptionsState] = useState(addsOnOptions);
  const handleSelectAddOn = (name:string) => {
    setOptionsState((prev) => {
      return prev.map((option) => {
        if (option.name === name) {
          return {  
            ...option,
            checked: !option.checked,
          };
        }
        return option;
      });
    });
  };


  useEffect(() => {
    const selectedOptions = optionsState.filter(option => option.checked)
    dispatch(setAddsOn(selectedOptions))
  }, [dispatch, optionsState])

  return (
    <LayoutStep>
      <LayoutStep.Header>Pick add on</LayoutStep.Header>
      <p className={`my-6 text-cool-gray`}>
        Add-ons help enhance your gaming experience
      </p>
      <div>
        {optionsState.map((option) => (
          <div
            role="button"
            aria-description="select add-on"
            onClick={() => handleSelectAddOn(option.name)}
            key={option.id}
            className={`flex justify-between gap-4 border-[1px]  rounded-md p-2 md:p-4 items-center my-4 ${
              option.checked ? "border-purplish-blue" : "border-cool-gray"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <Checkbox checked={option.checked ? true : undefined} />
              <div>
                <h3 className={`text-lg font-bold text-marine-blue `}>
                  {option.name}
                </h3>
                <p className={`text-cool-gray text-sm`}>{option.desc}</p>
              </div>
            </div>
            <p className="text-purplish-blue">+
              {paymentPlan === "monthly"
                ? `${option.priceMonth}/mo`
                : `${option.priceYear}/yr`}
            </p>
          </div>
        ))}
      </div>
    </LayoutStep>
  );
};

export default Step3Form;
