import { useEffect } from "react";
import { motion } from "framer-motion";
import type { PageProps } from "./types";
import { useNavigate } from "react-router-dom";

function TotalPnl({
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
    document.body.className = "frame-page page-total-pnl";
    return () => {
      document.body.className = "";
    };
  }, []);

  const totalPnl = walletWrapped?.realized_pnl_usd ?? 0;
  const formattedPnl = new Intl.NumberFormat("en-US").format(totalPnl);

  return (
    <div className="frame-wrapper">
      <motion.div
        className="frame-inner"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Fő szöveg – smooth beúszás */}
        <motion.h1
          className="frame-title-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your total PnL was
          <br />
          {/* 💥 ROBBANÓ + RÁZKÓDÓ SZÁM 💥 */}
          <motion.span
            className="pnl-number"
            initial={{ opacity: 0, scale: 0.3, y: 10 }}
            animate={{
              opacity: 1,
              scale: [0.3, 1.4, 0.9, 1.15, 1],
              x: [0, -8, 8, -4, 0],     // rázkódás balra-jobbra
              y: 0
            }}
            transition={{
              duration: 1.3,           // hosszabb animáció
              ease: "easeOut",
              delay: 0.55,             // kicsit később indul, mint a szöveg
              times: [0, 0.35, 0.6, 0.85, 1]
            }}
          >
            ${formattedPnl}
          </motion.span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

export default TotalPnl;
