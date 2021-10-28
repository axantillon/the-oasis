import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: "https://mainnet.infura.io/v3/341056d433f4489e8b5f0ea104eebc60" },
  qrcode: true,
});

