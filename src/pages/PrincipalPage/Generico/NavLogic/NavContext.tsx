import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface MenuState {
  selectedLink: string;
}

interface MenuStateContextProps {
  localMenuState: MenuState;
  setLocalMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
}

const MenuStateContext = createContext<MenuStateContextProps | undefined>(undefined);

export const useMenuState = () => {
  const context = useContext(MenuStateContext);
  if (!context) {
    throw new Error('useMenuState must be used within a MenuStateProvider');
  }
  return context;
};

interface MenuStateProviderProps {
  children: ReactNode;
}

export const MenuStateProvider: React.FC<MenuStateProviderProps> = ({ children }) => {
  const [localMenuState, setLocalMenuState] = useState<MenuState>({ selectedLink: 'Home' });

  const value = useMemo(() => {
    return {
      localMenuState,
      setLocalMenuState,
    };
  }, [localMenuState, setLocalMenuState]);

  return (
    <MenuStateContext.Provider value={value}>
      {children}
    </MenuStateContext.Provider>
  );
};

export default MenuStateContext;
