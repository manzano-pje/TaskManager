import React, { createContext, useContext, useEffect, useState } from 'react';
import { getContract } from '../libs/taskManager';
import { Contract } from 'ethers';

interface WalletContextType {
  contract: Contract | null;
  account: string;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string>('');
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    if (!window.ethereum) {
      alert('MetaMask não encontrada');
      return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const instance = await getContract(true);
    const signer = await instance.signer.getAddress();
    setAccount(signer);
    setContract(instance);
    setConnected(true);
  };

  const disconnect = () => {
    setContract(null);
    setAccount('');
    setConnected(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (!accounts.length) return disconnect();
        setAccount(accounts[0]);
      });
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  return (
    <WalletContext.Provider value={{ contract, account, connected, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet deve ser usado dentro de WalletProvider');
  return ctx;
}
