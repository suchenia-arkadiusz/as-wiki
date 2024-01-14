import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Toaster } from "../components/Toaster/Toaster.tsx";
import { v4 as uuidv4 } from "uuid";

type Props = {
  children: ReactNode;
};

export type ToasterContextType = {
  addToast: (message: string, type: "DANGER" | "ERROR" | "SUCCESS") => void;
  toasters: Array<ReactNode>;
};

export const ToasterProvider = (props: Props) => {
  const [toasters, setToasters] = useState<Array<ReactNode>>([]);
  const addToast = (message: string, type: "DANGER" | "ERROR" | "SUCCESS") => {
    setToasters((prev) => [...prev, <Toaster key={uuidv4()} message={message} type={type} />]);
    setTimeout(() => {
      setToasters((prev) => prev.slice(1));
    }, 6000);
  };

  const contestValue = useMemo(() => ({ addToast, toasters }), []);

  return <ToasterContext.Provider value={contestValue}>{props.children}</ToasterContext.Provider>;
};

export const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToasterContext = () => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error("useToasterContext must be used within a ToasterProvider");
  }

  return context;
};
