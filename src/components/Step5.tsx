import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import loadingImage from "../assets/images/loadingIllu.svg";
import thanksImage from "../assets/images/icon-thank-you.svg";
import LayoutStep from "@/layout/LayoutStep";
const Step5 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <LayoutStep>
      <AnimatePresence>
        {loading && (
          <div className="flex flex-col items-center">
            <m.img
              src={loadingImage}
              className="w-20 mt-4"
              animate={{ scale: [1, 1, 1, 1.2, 1.3, 1.4, 1.3, 1.2, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <m.p
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-cool-gray mt-4"
            >
              Submitting...
            </m.p>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!loading && (
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <img src={thanksImage} className="w-16 mt-10" />
            <h2 className="text-marine-blue font-bold">Thank you!</h2>
            <p className="text-center text-cool-gray text-sm mb-5">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </LayoutStep>
  );
};

export default Step5;
