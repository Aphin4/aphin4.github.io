import React from 'react';
import { useEffect} from 'react';
import { HashRouter, Routes, Route, useLocation,  } from 'react-router-dom';
import { SCPLayout } from './components/SCPLayout';
import { Home } from './pages/Home';
import { Cinfo } from './pages/Cinfo';
import { Keycards } from './pages/Keycards';
import { Information } from './pages/Information';
import { History } from './pages/History';
import { CASSIE } from './pages/CASSIE';
import { TOCProvider } from './context/TOCContext';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = "G-YMML54VQ0W"; 
ReactGA.initialize(MEASUREMENT_ID);

ReactGA.send({ hitType: "pageview", page: window.location.hash || window.location.pathname });

const App: React.FC = () => {

const Analytics = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.hash });
  }, [location]);
  return null;
};
  
  return (
    <HashRouter>
      <Analytics />
      <TOCProvider>
        <SCPLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cinfo" element={<Cinfo />} />
            <Route path="/cassie" element={<CASSIE />} />
            <Route path="/keycards" element={<Keycards />} />
            <Route path="/information" element={<Information />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </SCPLayout>
      </TOCProvider>
    </HashRouter>
  );
};

export default App;
