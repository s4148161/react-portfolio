import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({
    calendarStart: "05:00",
    calendarEnd: "22:00",
    calendarIncrements: "60",
  });

  return (
    <AppContext.Provider
        value={{items, setItems, settings, setSettings}}
    >
        {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
    return useContext(AppContext)
}



