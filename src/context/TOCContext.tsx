import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface TOCContextType {
  showTOC: boolean;
  setShowTOC: (show: boolean) => void;
  refreshTrigger: number;
  refreshTOC: () => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const TOCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTOC, setShowTOC] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshTOC = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <TOCContext.Provider value={{ showTOC, setShowTOC, refreshTrigger, refreshTOC }}>
      {children}
    </TOCContext.Provider>
  );
};

export const useTOC = (enable: boolean = true) => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOC must be used within a TOCProvider');
  }

  useEffect(() => {
    context.setShowTOC(enable);
    return () => context.setShowTOC(false);
  }, [enable, context]);
};

export const useTOCState = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOCState must be used within a TOCProvider');
  }
  return context.showTOC;
};

export const useTOCRefresh = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOCRefresh must be used within a TOCProvider');
  }
  return { refreshTrigger: context.refreshTrigger, refreshTOC: context.refreshTOC };
};