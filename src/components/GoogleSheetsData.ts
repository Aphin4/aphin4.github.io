import Papa from 'papaparse';
import useSWR from 'swr';

const SPREADSHEET_KEY = '2PACX-1vR7eJDGzK_SPH_KqsCouWFO1XR7yN5begtpnEvYV8NNiaYP5BBXS6BcisJNuJ6nwKuRlcWegWGFMM-G';

const SHEETS_CONFIG = [
  { name: 'database1', gid: '1826825207' },
  { name: 'database2', gid: '715521451' },
  { name: 'database3', gid: '1593061573' },
  { name: 'database4', gid: '1924081634' },
  { name: 'database5', gid: '2123056300' },
  { name: 'database6', gid: '2104192889' },
  { name: 'database7', gid: '523095603' },
  { name: 'database8', gid: '1996752332' },
];

interface DataItem {
  group: string;
  subgroup: string;
  name: string;
  code: string;
}

interface Databases {
  [key: string]: DataItem[];
}

export interface UseGoogleSheetsDataResult {
  data: Databases;
  loading: boolean;
  error: string | null;
}

const sheetsFetcher = async (): Promise<Databases> => {
  console.log('SWR загружает данные');
  
  const promises = SHEETS_CONFIG.map(sheet => {
    const url = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_KEY}/pub?gid=${sheet.gid}&single=true&output=csv`;
    return new Promise<{ name: string; data: DataItem[] }>((resolve, reject) => {
      Papa.parse<DataItem>(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve({ name: sheet.name, data: results.data }),
        error: (err) => reject(err),
      });
    });
  });

  const allSheetsData = await Promise.all(promises);
  const databasesObject = allSheetsData.reduce((acc, sheet) => {
    acc[sheet.name] = sheet.data;
    return acc;
  }, {} as Databases);

  return databasesObject;
};


export const useGoogleSheetsData = () => {
  const cacheKey = 'google-sheets-data';

  const { data, error, isLoading } = useSWR<Databases>(cacheKey, sheetsFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data: data || {}, 
    loading: isLoading,
    error: error,
  };
};



