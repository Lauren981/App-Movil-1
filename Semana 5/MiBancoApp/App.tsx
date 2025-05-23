import React from 'react';
import Navegacion from './src/navegacion/navegacion';
import { AppProvider } from './src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Navegacion />
    </AppProvider>
  );
};

export default App;