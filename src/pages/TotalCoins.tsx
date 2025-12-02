import { useEffect } from "react";
import { motion } from "framer-motion";
import type { WalletWrappedResponse } from "../api/types";
import type { PageProps } from "./types";
import { useNavigate } from "react-router-dom";
import { estimateMemecoinTraderPercentile } from "../utils/estimate";

function TotalCoins({
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
    document.body.className = "frame-page page-total-coins";
    return () => {
      document.body.className = "";
    };
  }, []);

  const totalCoins = walletWrapped?.tokens_traded ?? 0;
  const formattedCoins = new Intl.NumberFormat("en-US").format(totalCoins);

  const percentile = estimateMemecoinTraderPercentile(totalCoins);

  const percentileLabel =
    percentile % 1 === 0 ? percentile.toFixed(0) : percentile.toFixed(1);

  return (
    <div className="frame-wrapper">
      <div className="frame-inner">
        <motion.h1
          className="frame-title-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          You traded
          <br />
          <span className="coins-number">{formattedCoins} coins</span>
          <br />
          this year
        </motion.h1>

        <motion.p
          className="frame-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        >
          This puts you in the top {percentileLabel}% of memecoin traders.
        </motion.p>
      </div>
    </div>
  );
}

export default TotalCoins;
