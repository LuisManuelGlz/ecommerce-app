import React, { createContext, createRef, ReactNode, RefObject, useRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

type AlertContextType = {
  alert: (
    type: 'success' | 'info' | 'warn' | 'error',
    title: string,
    message: string,
  ) => void;
};

interface Props {
  children: ReactNode;
}

export const AlertContext = createContext({} as AlertContextType);
const dropDownAlertRef = createRef<DropdownAlert>();

const alert = (
  type: 'success' | 'info' | 'warn' | 'error',
  title: string,
  message: string,
) => {
  dropDownAlertRef.current!.alertWithType(type, title, message);
};

const AlertProvider = ({ children }: Props) => {
  return (
    <AlertContext.Provider value={{ alert }}>
      <DropdownAlert ref={dropDownAlertRef} />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
