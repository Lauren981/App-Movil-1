import React, { createContext, useContext, useState } from 'react';

interface Transaccion {
  id: string;
  desc: string;
}

interface BalanceContextType {
  balance: number;
  transacciones: Transaccion[];
  deposito: (amount: number) => void;
  retiro: (amount: number, desc: string) => boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(10000);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([
    { id: '1', desc: 'Depósito de L.500' },
    { id: '2', desc: 'Retiro de L.200' },
    { id: '3', desc: 'Depósito de L.1000' },
  ]);

  const deposito = (amount: number) => {
    setBalance(b => b + amount);
    setTransacciones(ts => [
      { id: (ts.length + 1).toString(), desc: `Depósito de L.${amount}` },
      ...ts,
    ]);
  };

  const retiro = (amount: number, desc: string) => {
    if (amount > balance) return false;
    setBalance(b => b - amount);
    setTransacciones(ts => [
      { id: (ts.length + 1).toString(), desc },
      ...ts,
    ]);
    return true;
  };

  return (
    <BalanceContext.Provider value={{ balance, transacciones, deposito, retiro }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error('useBalance debe usarse dentro de BalanceProvider');
  return ctx;
};
