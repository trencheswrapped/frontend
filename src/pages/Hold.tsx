import { useEffect } from "react";
import { motion } from "framer-motion";
import type { PageProps } from "./types";
import { useNavigate } from "react-router-dom";

function classifyHoldCategory(medianHoldSeconds: number): string {
  if (!Number.isFinite(medianHoldSeconds) || medianHoldSeconds < 0) {
    return "JEETER";
  }

  const s = medianHoldSeconds;

  if (s <= 5) return "JEETER";
  if (s <= 8) return "FLIPPER";
  if (s <= 12) return "MICROHOLD";
  if (s <= 20) return "BAGDODGER";
  if (s <= 25) return "FOMOEXIT";
  if (s <= 35) return "AVERAGEJOE";
  if (s <= 40) return "HODLING";
  if (s <= 50) return "DIAMONDHANDER";
  if (s <= 55) return "JACKDUVAL";

  return "ROUNDTRIPPER";
}

function Hold({
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
    document.body.className = "frame-page page-hold";
    return () => {
      document.body.className = "";
    };
  }, []);

  const holdTime = walletWrapped?.median_holding_time_seconds ?? 0;

  return (
    <div className="frame-wrapper">
      <div className="frame-inner hold-inner">
        <motion.p
          className="hold-title"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Median Hold Time
          <br />
          was <span className="hold-highlight">{holdTime} seconds</span>
        </motion.p>

        <motion.p
          className="hold-subtitle"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          that puts you into
          <br />
          category
        </motion.p>

        <motion.p
          className="hold-category-outline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          {classifyHoldCategory(holdTime)}
        </motion.p>
      </div>
    </div>
  );
}

export default Hold;
