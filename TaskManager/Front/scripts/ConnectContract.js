// Front/Scripts/connectContract.js
import { ethers } from 'ethers';
import { abi } from '../Contracts/TaskManagerAbi';

const contratoAddress = '0xSEU_ENDERECO_CONTRATO';

export async function conectarContrato() {
  if (!window.ethereum) {
    alert("Instale a Metamask");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const contrato = new ethers.Contract(contratoAddress, abi, signer);

  return contrato;
}
