
import Navigation from './Navigation';
import { BalanceProvider } from './BalanceContext';


export default function App() {
  return (
    <BalanceProvider>
      <Navigation />
    </BalanceProvider>
  );
}

