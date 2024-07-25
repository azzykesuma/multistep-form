import React from 'react'
import {motion as m} from 'framer-motion'
const Step3Form = () => {
  return (
    <m.div
      className={`absolute bg-white rounded-lg shadow-lg p-4`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
    >
      <h1 className={`text-lg text-marine-blue font-bold`}>Pick add-ons</h1>
      <p className={`my-6 text-cool-gray`}>
        Add-ons help enhance your gaming experience
      </p>
    </m.div>
  );
}

export default Step3Form
