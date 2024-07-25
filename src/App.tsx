import { useState, createContext} from "react"
import Layout from "./layout/Layout"
import MainForm from "./components/MainForm";
import { StepContextType, StepType } from "Types";



export const StepContext = createContext<StepContextType>({
  step: 1,
  setStep: () => {}
});


function App() {
  const [step, setStep] = useState<StepType>(1)
  return (
  <StepContext.Provider value={{step, setStep}}>
    <Layout>
      <MainForm />
    </Layout>
  </StepContext.Provider>
  )
}

export default App