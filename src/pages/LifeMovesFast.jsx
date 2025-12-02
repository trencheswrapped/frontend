import { useEffect } from "react";
import { motion } from "framer-motion";

function LifeMovesFast() {
  useEffect(() => {
    document.body.className = "frame-page page-life-fast";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="frame-wrapper">

      {/* CÍM – megjelenik először */}
      <motion.div
        className="frame-inner"
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.65,
          ease: "easeOut"
        }}
      >
        <motion.h1
          className="frame-title-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: "easeOut"
          }}
        >
          Life moves fast
        </motion.h1>

        {/* SUBTITLE – késleltetve jelenik meg */}
        <motion.p
          className="frame-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
            delay: 0.45    // <<< 0.45 másodperces késés
          }}
        >
          Luckily we took notes.
        </motion.p>

      </motion.div>
    </div>
  );
}

export default LifeMovesFast;
