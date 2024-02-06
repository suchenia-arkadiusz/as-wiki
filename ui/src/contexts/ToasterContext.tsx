import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { Toaster } from '../components/Toaster/Toaster.tsx';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  children: ReactNode
}

export interface ToasterContextType {
  addToast: (_message: string, _type: 'DANGER' | 'ERROR' | 'SUCCESS') => void
  toasters: ReactNode[]
}

export const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider = (props: Props) => {
  const [toasters, setToasters] = useState<ReactNode[]>([]);
  const addToast = (message: string, type: 'DANGER' | 'ERROR' | 'SUCCESS') => {
    setToasters((prev) => [...prev, <Toaster key={uuidv4()} message={message} type={type} />]);
    setTimeout(() => {
      setToasters((prev) => prev.slice(1));
    }, 6000);
  };

  const contestValue = useMemo(() => ({ addToast }), []);

  return <ToasterContext.Provider value={{ ...contestValue, toasters }}>{props.children}</ToasterContext.Provider>;
};

export const useToasterContext = () => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error('useToasterContext must be used within a ToasterProvider');
  }

  return context;
};
