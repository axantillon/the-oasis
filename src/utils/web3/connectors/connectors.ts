import { allConnectors } from "../types";
import { injected } from "./injected";
import { walletconnect } from "./walletconnect";

export const connectors: { [id: string]: allConnectors } = {
  WalletConnect: walletconnect,
  MetaMask: injected,
};
