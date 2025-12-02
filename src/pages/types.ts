import type { WalletWrappedResponse } from "../api/types";

export const SOLANA_PRICE = 137;

export interface PageProps {
  walletWrapped: WalletWrappedResponse | null;
}