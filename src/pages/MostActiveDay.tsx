import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./types";

function MostActiveDay({
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
    document.body.className = "frame-page page-most-active";
    return () => {
      document.body.className = "";
    };
  }, []);

  const totalPnl = walletWrapped?.total_volume ?? 0;
  const formattedPnl = new Intl.NumberFormat("en-US").format(totalPnl);

  return (
    <div className="frame-wrapper">
      <div className="frame-inner mostactive-inner">
        <motion.h1
          className="mostactive-title"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your total <span className="highlight">Volume</span> was
          <span className="mostactive-number"> ${formattedPnl}</span>
        </motion.h1>
      </div>
    </div>
  );
}

export default MostActiveDay;
