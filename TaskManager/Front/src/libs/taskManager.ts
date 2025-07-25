import { Contract, BrowserProvider, JsonRpcProvider } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts/contractConfig';

export async function getContract(signerOrProvider?: any): Promise<Contract> {
  let provider;
  if (signerOrProvider) {
    provider = new BrowserProvider(window.ethereum);
  } else {
    provider = new JsonRpcProvider(); // fallback
  }
  await (provider as BrowserProvider).ready;
  const signer = signerOrProvider
    ? await (provider as BrowserProvider).getSigner()
    : undefined;
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer ?? provider);
}
