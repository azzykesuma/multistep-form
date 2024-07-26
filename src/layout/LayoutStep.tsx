import { ReactNode } from "react";
import { motion as m } from "framer-motion";
export const LayoutStep = ({children} : {children:ReactNode}) => {
  return (
    <m.div
      className="absolute bg-white rounded-lg shadow-lg md:shadow-none p-4 w-full md:top-10 md:w-[470px] md:z-10"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      layout
    >
        {children}
    </m.div>
  );
};

const TitleLayout = ({children} : {children:ReactNode}) => {
    return (
        <h1 className="text-lg text-marine-blue font-bold md:text-3xl">
        {children}
        </h1>
    );
}

LayoutStep.Header = TitleLayout;
