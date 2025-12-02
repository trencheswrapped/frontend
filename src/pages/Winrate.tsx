import { useEffect } from "react";
import { motion } from "framer-motion";
import type { PageProps } from "./types";
import { useNavigate } from "react-router-dom";

function Winrate({
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
    document.body.className = "frame-page page-winrate";
    return () => {
      document.body.className = "";
    };
  }, []);

  const winrate = walletWrapped?.winrate ?? 0;

  return (
    <div className="frame-wrapper">
      <div className="frame-inner">
        <motion.h1
          className="winrate-title"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          With a winrate of
          <br />
          <motion.span
            className="winrate-number"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            {winrate.toFixed(1)}%
          </motion.span>
        </motion.h1>
      </div>
    </div>
  );
}

export default Winrate;
