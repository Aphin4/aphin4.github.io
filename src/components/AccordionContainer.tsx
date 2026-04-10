import React from 'react';
import { useData } from '../context/GoogleSheetsDataContext';
import { AccordionCopy } from './AccordionCopy'; 
import { useTOCRefresh } from '../context/TOCContext';

interface AccordionContainerProps {
  databaseName: 'database1' | 'database2' | 'database3' | 'database4' | 'database5';
}

const AccordionContainer: React.FC<AccordionContainerProps> = ({ databaseName }) => {
  const { refreshTOC } = useTOCRefresh();
  const { data, loading, error } = useData();

  React.useEffect(() => {
    if (!loading && !error && data[databaseName]) {
      setTimeout(() => {
        refreshTOC();
      }, 100);
    }
  }, [loading, error, data, databaseName, refreshTOC]);

  if (loading) {
    return <div>Загрузка информации</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Ошибка загрузки данных.</div>;
  }

  const itemsToDisplay = data[databaseName];

  if (!itemsToDisplay) {
    return <div>Данные для "{databaseName}" не найдены.</div>;
  }

  return <AccordionCopy items={itemsToDisplay} />;
};

export default AccordionContainer;