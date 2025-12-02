import { useEffect } from "react";
import { motion } from "framer-motion";
import { SOLANA_PRICE, type PageProps } from "./types";
import { useNavigate } from "react-router-dom";


function TopTrade({
  walletWrapped,
}: PageProps) {
  /**
   * Redirect to home page if data is nulll
   */
  const navigate = useNavigate();
  useEffect(() => {
    if (walletWrapped == null) navigate("/");
  }, [walletWrapped]);
  useEffect(() => {
    document.body.className = "frame-page page-top-trade";
    return () => {
      document.body.className = "";
    };
  }, []);

  const totalPnl = (walletWrapped?.best_trade.total_pnl_usd ?? 0);
  const formattedPnl = new Intl.NumberFormat("en-US").format(totalPnl);

  return (
    <div className="frame-wrapper">
      <div className="frame-inner">
        <div
          className="trade-image"
          style={{ backgroundImage: "url('https://logos.cielo.finance/solana/" + walletWrapped?.best_trade.token_address + ".webp')" }}
        ></div>

        <motion.h1
          className="trade-title"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your top trade was “{walletWrapped?.best_trade?.token_name ?? ""}”
          <br />
          with a PnL of <span className="trade-pnl">{formattedPnl}$</span>
        </motion.h1>
        

              </div>
    </div>
  );
}

export default TopTrade;
