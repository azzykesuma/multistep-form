import { ReactNode } from "react";
import { motion as m } from "framer-motion";
const LayoutStep = ({children} : {children:ReactNode}) => {
  return (
    <m.div
      className="absolute bg-white rounded-lg shadow-lg p-4 w-full"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      layout
    >
        {children}
    </m.div>
  );
};

export default LayoutStep;
