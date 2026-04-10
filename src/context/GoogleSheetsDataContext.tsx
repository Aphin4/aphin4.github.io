import React, { createContext, useContext, ReactNode } from 'react';
import { useGoogleSheetsData } from '../components/GoogleSheetsData';
import type { UseGoogleSheetsDataResult } from '../components/GoogleSheetsData';

const DataContext = createContext<UseGoogleSheetsDataResult | null>(null);

export const GoogleSheetsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const sheetData = useGoogleSheetsData(); 

  return (
    <DataContext.Provider value={sheetData}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error('useData должен использоваться внутри GoogleSheetsDataProvider');
  }
  return context;
};