import { useEffect } from "react";
import { motion } from "framer-motion";
import { SOLANA_PRICE, type PageProps } from "./types";
import { useNavigate } from "react-router-dom";

function TopTradesList({
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
    document.body.className = "frame-page page-top-trades-list";
    return () => {
      document.body.className = "";
    };
  }, []);

  // Itt a 5 trade adat – nyugodtan átírhatod a neveket, PnL-t, className-t stb.
  const trades = [
    /*{
      rank: 1,
      nameMain: "BABY",
      nameSub: "Top gainer",
      pnl: "+420%",
      avatarClass: "custom-avatar",
    },
    {
      rank: 2,
      nameMain: "PATRICK",
      nameSub: "Diamond hands",
      pnl: "+310%",
      avatarClass: "patrick",
    },
    {
      rank: 3,
      nameMain: "WINTER",
      nameSub: "Perfect exit",
      pnl: "+250%",
      avatarClass: "winter",
    },
    {
      rank: 4,
      nameMain: "UNDERSTAND",
      nameSub: "High conviction",
      pnl: "+180%",
      avatarClass: "understand",
    },
    {
      rank: 5,
      nameMain: "PICO",
      nameSub: "Sniped early",
      pnl: "+120%",
      avatarClass: "pico",
    },*/
  ];

  if (walletWrapped !== null) {
    let index = 1;
    for (const trade of walletWrapped.top_trades) {
      const totalProfit = trade.total_pnl_usd;

      trades.push({
        rank: index,
        nameMain: trade.token_name,
        nameSub: trade.token_symbol,
        pnl: new Intl.NumberFormat("en-US").format(totalProfit) + "$",
        image: `https://logos.cielo.finance/solana/` + trade.token_address + `.webp`,
        profit: totalProfit > 0,
      });
      index++;
    }
  }

  return (
    <div className="frame-wrapper">
      <div className="frame-inner">
        <motion.h1
          className="top-trades-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Your top trades
        </motion.h1>

        <div className="trades-list">
          {trades.map((trade, index) => (
            <motion.div
              key={trade.rank}
              className="trade-row"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: 0.15 + index * 0.12, // egymás után jönnek, mint az SMS-ek
              }}
            >
              <div className="trade-rank">#{trade.rank}</div>

              <div className="trade-info">
                <div className="trade-avatar" style={{
                  backgroundImage: "url('" + trade.image + "')",
                }} />
                <div className="trade-names">
                  <span className="trade-name-main">{trade.nameMain}</span>
                  <span className="trade-name-sub">{trade.nameSub}</span>
                </div>
              </div>

              <div className={trade.profit ? "pnl-badge-good" : "pnl-badge-bad"}>{trade.profit ? "+" : "-"}{trade.pnl}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopTradesList;
