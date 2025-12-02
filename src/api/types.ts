export interface TokenPNL {
  num_swaps: number;
  total_buy_usd: number;
  total_buy_amount: number;
  total_sell_usd: number;
  total_sell_amount: number;
  average_buy_price: number;
  average_sell_price: number;
  total_pnl_usd: number;
  token_price_usd: number;
  roi_percentage: number;
  unrealized_roi_percentage: number;
  token_address: string;
  token_symbol: string;
  token_name: string;
  chain: string;
  first_trade: number;   // int64 → number
  last_trade: number;    // int64 → number
  hold_time: number;     // int64 → number
  is_honeypot: boolean;
  chart_link: string;
  holding_amount: number;
  holding_amount_usd: number;
  token_market_cap_usd: number;
}


export interface WalletWrappedResponse {
  tokens_traded: number;
  winrate: number;
  best_trade: TokenPNL;
  worst_trade: TokenPNL;
  top_trades: TokenPNL[];
  realized_pnl_usd: number;
  median_holding_time_seconds: number;
  total_volume: number;
}