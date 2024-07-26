import { useState, createContext } from "react";
import Layout from "./layout/Layout";
import MainForm from "./components/MainForm";
import { StepContextType, StepType } from "Types";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

export const StepContext = createContext<StepContextType>({
  step: 1,
  setStep: () => {},
});

function App() {
  const [step, setStep] = useState<StepType>(5);
  return (
    <StepContext.Provider value={{ step, setStep }}>
      <Layout>
        <Provider store={store}>
          <MainForm />
        </Provider>
      </Layout>
    </StepContext.Provider>
  );
}

export default App;
