import React, { useState } from 'react';
import { createContext, useContext, ReactNode } from 'react';

type Transaction = { 
id: number; 
type: string; 
amount: number; 
}; 

type AppContextType = { 
balance: number; 
transactions: Transaction[]; 
deposit: () => void; 
transfer: (amount: number, recipient: string) => boolean; 
}; 

const AppContext = createContext<AppContextType | undefined>(undefined); 

export const AppProvider = ({ children }: { children: ReactNode }) => { 
const [balance, setBalance] = useState(10000); 
const [transactions, setTransactions] = useState<Transaction[]>([]); 

const deposit = () => { 
setBalance(prevBalance => prevBalance + 500); 
setTransactions(prevTransactions => [ 
{ id: prevTransactions.length + 1, type: 'Depósito', amount: 500 }, 
...prevTransactions.slice(0, 4), 
]); 
}; 

const transfer = (amount: number, recipient: string) => { 
if (amount > balance) { 
alert("Su cuenta tiene saldo insuficiente para realizar la operación.");
return false; 
} 

setBalance(prevBalance => prevBalance - amount); 
setTransactions(prevTransactions => [ 
{ id: prevTransactions.length + 1, type: `Transferencia a ${recipient}`, amount }, 
...prevTransactions.slice(0, 4), 
]); 

alert("Transferencia exitosa"); 
return true; 
}; 

return ( 
<AppContext.Provider value={{ balance, transactions, deposit, transfer }}> 
{children} 
</AppContext.Provider> 
); 
}; 

export const useAppContext = () => { 
const context = useContext(AppContext); 

return context; 
}; 